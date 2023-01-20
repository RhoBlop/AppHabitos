import dayjs from 'dayjs';
import { FastifyInstance, FastifyRequest } from 'fastify';
import { z } from 'zod';
import { prisma } from './lib/prisma';

export async function appRoutes(app: FastifyInstance) {
	app.post('/habit', createHabit);

	app.get('/day', getDayDetail);

	app.patch('/habit/:id/toggle', toggleDayHabit);
}

async function createHabit(request: FastifyRequest) {
	const createHabitBody = z.object({
		title: z.string(),
		weekDays: z.array(z.number().min(0).max(6)).length(7)
	});
	// creates today with midnight time - yyyy-mm-dd 00:00:00
	const today = dayjs().startOf('day').toDate();

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

	const parsedDate = dayjs(date).startOf('day');
	const weekDay = parsedDate.get('day');

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
	console.log(possibleHabits);

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

	const today = dayjs().startOf('day').toDate();

	let day = await prisma.day.findUnique({
		where: {
			date: today
		}
	});

	// app only creates current day when first habit is toggled
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
}
