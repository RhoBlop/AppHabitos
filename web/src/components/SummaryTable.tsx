import { generateDatesFromYearFirstDay } from '../utils/generate-dates-from-year-first-day';
import { TableDay } from './TableDay';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const summaryDates = generateDatesFromYearFirstDay();

const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length;

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
				{summaryDates.map((day) => {
					return (
						<TableDay
							key={day.toString()}
							amount={10}
							completed={Math.round(Math.random() * 10)}
						/>
					);
				})}

				{amountOfDaysToFill > 0 &&
					Array.from({ length: amountOfDaysToFill }).map((_, i) => {
						return (
							<div
								key={i}
								className='w-10 h-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed'></div>
						);
					})}
			</div>
		</div>
	);
}
