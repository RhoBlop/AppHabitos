import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const firstHabitId = 'cld33ru0c00002a6c7q4jkh33';
const firstHabitCreationDate = new Date('2022-12-31T00:00:00.000');

const secondHabitId = 'cld33sa6z000008mieqq931gw';
const secondHabitCreationDate = new Date('2023-01-03T00:00:00.000');

const thirdHabitId = 'cld33ssft000308mihu6b9buh';
const thirdHabitCreationDate = new Date('2023-01-08T00:00:00.000');

async function main() {
	await prisma.habit.deleteMany();
	await prisma.day.deleteMany();

	/**
	 * Create habits
	 */
	await Promise.all([
		prisma.habit.create({
			data: {
				id: firstHabitId,
				title: 'Beber 2L água',
				created_at: firstHabitCreationDate,
				HabitWeekDays: {
					create: [{ week_day: 1 }, { week_day: 2 }, { week_day: 3 }]
				}
			}
		}),

		prisma.habit.create({
			data: {
				id: secondHabitId,
				title: 'Exercitar',
				created_at: secondHabitCreationDate,
				HabitWeekDays: {
					create: [{ week_day: 3 }, { week_day: 4 }, { week_day: 5 }]
				}
			}
		}),

		prisma.habit.create({
			data: {
				id: thirdHabitId,
				title: 'Dormir 8h',
				created_at: thirdHabitCreationDate,
				HabitWeekDays: {
					create: [
						{ week_day: 1 },
						{ week_day: 2 },
						{ week_day: 3 },
						{ week_day: 4 },
						{ week_day: 5 }
					]
				}
			}
		})
	]);

	await Promise.all([
		/**
		 * Habits (Complete/Available): 1/1
		 */
		prisma.day.create({
			data: {
				/** Monday */
				date: new Date('2023-01-02T03:00:00.000z'),
				DayHabit: {
					create: {
						habit_id: firstHabitId
					}
				}
			}
		}),

		/**
		 * Habits (Complete/Available): 1/1
		 */
		prisma.day.create({
			data: {
				/** Friday */
				date: new Date('2023-01-06T03:00:00.000z'),
				DayHabit: {
					create: {
						habit_id: firstHabitId
					}
				}
			}
		}),

		/**
		 * Habits (Complete/Available): 2/2
		 */
		prisma.day.create({
			data: {
				/** Wednesday */
				date: new Date('2023-01-04T03:00:00.000z'),
				DayHabit: {
					create: [{ habit_id: firstHabitId }, { habit_id: secondHabitId }]
				}
			}
		})
	]);
}

main()
	.then(async () => {
		await prisma.$disconnect;
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect;
		process.exit(1);
	});
