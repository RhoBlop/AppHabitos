import { ScrollView, View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';
import dayjs from 'dayjs';

import { BackButton } from '../components/BackButton';
import { ProgressBar } from '../components/ProgressBar';
import { Checkbox } from '../components/Checkbox';
import { Loading } from '../components/Loading';

import { useFetchDay } from '../hooks/useFetchDay';

interface RouteParams {
	date: string;
}

export function Habit() {
	const route = useRoute();
	const { date } = route.params as RouteParams;
	const {
		habits: { possibleHabits },
		habits: { completedHabitsIds },
		loading
	} = useFetchDay(date);

	console.log('oi');

	const parsedDate = dayjs(date);
	const fullWeekDay = parsedDate.format('dddd');
	const dayAndMonth = parsedDate.format('DD/MM');

	return (
		<View className='flex-1 bg-background px-8 pt-14'>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 30 }}
			>
				<BackButton />

				<Text className='font-semibold text-zinc-400/60 text-xl mt-6 lowercase'>
					{fullWeekDay}
				</Text>
				<Text className='font-extrabold text-white text-4xl leading-relaxed mt-2'>
					{dayAndMonth}
				</Text>

				{loading ? (
					<Loading />
				) : (
					<>
						<ProgressBar progress={50} />

						<View className='mt-8'>
							{possibleHabits?.map((habit) => {
								return (
									<Checkbox
										key={habit.id}
										title={habit.title}
										checked={completedHabitsIds?.includes(habit.id)}
									/>
								);
							})}
						</View>
					</>
				)}
			</ScrollView>
		</View>
	);
}
