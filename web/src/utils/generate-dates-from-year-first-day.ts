import dayjs from 'dayjs';

// return dates from current year beginning until current day
export function generateDatesFromYearFirstDay() {
	const firstDayOfYear = dayjs().startOf('year');
	const today = new Date();

	const dates = [];
	let compareDate = firstDayOfYear;

	while (compareDate.isBefore(today)) {
		dates.push(compareDate.toDate());
		compareDate = compareDate.add(1, 'day');
	}

	return dates;
}
