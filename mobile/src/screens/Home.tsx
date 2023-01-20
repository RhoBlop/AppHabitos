import { Text, View, ScrollView } from 'react-native';
import { Header } from '../components/Header';
import { TableDay, DAY_SIZE } from '../components/TableDay';
import { generateDatesFromYearFirstDay } from '../utils/generate-dates-from-year-first-day';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const activeDates = generateDatesFromYearFirstDay();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - activeDates.length;

export function Home() {
	return (
		<View className='flex flex-1 bg-background px-8 pt-16'>
			<Header />

			<View className='flex-row mt-6 mb-2'>
				{weekDays.map((weekDay, i) => {
					return (
						<Text
							key={`${weekDay}-${i}`}
							className='text-zinc-400 text-xl font-bold text-center mx-1'
							style={{ width: DAY_SIZE, height: DAY_SIZE }}>
							{weekDay}
						</Text>
					);
				})}
			</View>

			<ScrollView showsVerticalScrollIndicator={false} className='pb-24'>
				<View className='flex-row flex-wrap'>
					{activeDates.map((date) => {
						return <TableDay key={date.toISOString()} />;
					})}

					{amountOfDaysToFill > 0 &&
						Array.from<number>({ length: amountOfDaysToFill }).map((num, i) => {
							return <DisabledDay key={i} />;
						})}
				</View>
			</ScrollView>
		</View>
	);
}

const DisabledDay = () => {
	return (
		<View
			className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800 opacity-50'
			style={{ width: DAY_SIZE, height: DAY_SIZE }}
		/>
	);
};