import { generateDatesFromYearFirstDay } from '../utils/generate-dates-from-year-first-day';
import { TableDay } from './TableDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const activeDates = generateDatesFromYearFirstDay();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - activeDates.length;

export function SummaryTable() {
	return (
		<div className='w-full flex'>
			<div className='grid grid-rows-7 grid-flow-row gap-3'>
				{weekDays.map((day, i) => {
					return (
						<div
							key={`${day}-${i}`}
							className='font-bold text-zinc-400 text-xl h-10 w-10 flex items-center justify-center'>
							{day}
						</div>
					);
				})}
			</div>

			<div className='grid grid-rows-7 grid-flow-col gap-3'>
				{activeDates.map((day) => {
					return <TableDay key={day.toString()} />;
				})}

				{amountOfDaysToFill > 0 &&
					Array.from<number>({ length: amountOfDaysToFill }).map((num, i) => {
						return (
							<div
								key={i}
								className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-50 cursor-not-allowed'></div>
						);
					})}
			</div>
		</div>
	);
}
