import { useNavigation } from '@react-navigation/native';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Text, View, ScrollView, Alert } from 'react-native';

import { Header } from '../components/Header';
import { Loading } from '../components/Loading';
import { TableDay, DisabledDay, DAY_SIZE } from '../components/TableDay';

import { api } from '../lib/axios';
import { generateDatesFromYearFirstDay } from '../utils/generate-dates-from-year-first-day';

const weekDays = ['D', 'S', 'T', 'Q', 'Q', 'S', 'S'];
const activeDates = generateDatesFromYearFirstDay();
const minimumSummaryDatesSize = 18 * 7;
const amountOfDaysToFill = minimumSummaryDatesSize - activeDates.length;

interface DayHabit {
	id: string;
	date: string;
	amount: number;
	completed: number;
}

export function Home() {
	const [loading, setLoading] = useState(true);
	const [summary, setSummary] = useState<DayHabit[]>([]);
	const { navigate } = useNavigation();

	async function fetchSummary() {
		try {
			setLoading(true);
			const response = await api.get('/summary');
			setSummary(response.data);
		} catch (err) {
			Alert.alert('Erro', 'Não foi possível carregar o sumário de hábitos');
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchSummary();
	}, []);

	if (loading) {
		return (
			<View className='flex flex-1 bg-background px-8 pt-16'>
				<Header />
				<Loading />
			</View>
		);
	}

	return (
		<View className='flex flex-1 bg-background px-8 pt-16'>
			<Header />

			<View className='flex-row mt-6 mb-2'>
				{weekDays.map((weekDay, i) => {
					return (
						<Text
							key={`${weekDay}-${i}`}
							className='text-zinc-400 text-xl font-bold text-center mx-1'
							style={{ width: DAY_SIZE, height: DAY_SIZE }}
						>
							{weekDay}
						</Text>
					);
				})}
			</View>

			<ScrollView
				showsVerticalScrollIndicator={true}
				contentContainerStyle={{ paddingBottom: 30 }}
			>
				<View className='flex-row flex-wrap'>
					{activeDates.map((date) => {
						const dayHabits = summary?.find((day) => {
							return dayjs(date).isSame(day.date, 'day');
						});

						return (
							<TableDay
								key={date.toISOString()}
								amount={dayHabits?.amount}
								completed={dayHabits?.completed}
								onPress={() => {
									navigate('habit', { date: date.toISOString() });
								}}
							/>
						);
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
