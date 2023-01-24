import dayjs from 'dayjs';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prisma';

export async function appRoutes(app: FastifyInstance) {
	app.post('/habit', createHabit);

	app.patch('/habit/:id/toggle', toggleDayHabit);

	app.get('/day', getDayDetail);

	app.get('/summary', getSummary);
}

async function createHabit(request: FastifyRequest) {
	const createHabitBody = z.object({
		title: z.string(),
		weekDays: z.array(z.number().min(0).max(6)).max(7)
	});
	// creates today with midnight time - yyyy-mm-dd 00:00:00
	const today = dayjs.utc().startOf('day').toDate();

	const { title, weekDays } = createHabitBody.parse(request.body);
	const habit = prisma.habit.create({
		data: {
			title: title,
			created_at: today,
			HabitWeekDays: {
				create: weekDays.map((weekDay) => {
					return {
						week_day: weekDay
					};
				})
			}
		}
	});

	return habit;
}

async function getDayDetail(request: FastifyRequest) {
	const getDayParams = z.object({
		date: z.coerce.date()
	});
	const { date } = getDayParams.parse(request.query);

	const parsedDate = dayjs.utc(date).startOf('day');
	const weekDay = parsedDate.get('day');
	console.log(parsedDate, weekDay);

	const possibleHabits = await prisma.habit.findMany({
		where: {
			created_at: {
				lte: parsedDate.toDate()
			},
			HabitWeekDays: {
				some: {
					week_day: weekDay
				}
			}
		}
	});

	const completedDayHabits = await prisma.day.findUnique({
		where: {
			date: parsedDate.toDate()
		},
		include: {
			DayHabit: true
		}
	});

	const completedHabitsIds = completedDayHabits?.DayHabit.map((habit) => {
		return habit.habit_id;
	});

	return {
		possibleHabits,
		completedHabitsIds
	};
}

async function toggleDayHabit(request: FastifyRequest) {
	const toggleHabitParams = z.object({
		id: z.string().cuid()
	});
	const { id } = toggleHabitParams.parse(request.params);

	const today = dayjs.utc().startOf('day').toDate();

	// checks if current day already exists - it only is recorded on db when at
	// least one habit is toggled for the first time
	let day = await prisma.day.findUnique({
		where: {
			date: today
		}
	});

	if (!day) {
		day = await prisma.day.create({
			data: {
				date: today,
				DayHabit: {
					create: {
						habit_id: id
					}
				}
			}
		});
	}

	const dayHabit = await prisma.dayHabit.findUnique({
		where: {
			day_id_habit_id: {
				day_id: day.id,
				habit_id: id
			}
		}
	});

	let message;
	if (dayHabit) {
		// "uncheks" habit
		await prisma.dayHabit.delete({
			where: {
				id: dayHabit.id
			}
		});
		message = 'toggled off';
	} else {
		// "check" habit
		await prisma.dayHabit.create({
			data: {
				day_id: day.id,
				habit_id: id
			}
		});
		message = 'toggled on';
	}

	return {
		message
	};
}

async function getSummary(request: FastifyRequest) {
	const summary = await prisma.$queryRaw`
        SELECT 
            D.id, 
            D.date,
            (
                SELECT 
                    cast(count(*) as float)
                FROM dayHabit DH
                WHERE DH.day_id = D.id
            ) AS completed,
            (
                SELECT
                    cast(count(*) as float)
                FROM habitWeekDay HWD
                JOIN habit H ON (H.id = HWD.habit_id)
                WHERE 
                    HWD.week_day = cast(strftime('%w', D.date/1000.0, 'unixepoch') as int)
                    AND H.created_at <= D.date
            ) AS amount
        FROM day D
        ORDER BY D.date
    `;

	return summary;
}
