import { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

import { BackButton } from '../components/BackButton';
import { Checkbox } from '../components/Checkbox';

const availableWeekDays = [
	'Domingo',
	'Segunda-feira',
	'Terça-feira',
	'Quarta-feira',
	'Quinta-feira',
	'Sexta-feira',
	'Sábado'
];

export function NewHabit() {
	const [checkedWeekDays, setCheckedWeekDays] = useState<number[]>([]);

	function handleToggleWeekDay(weekDayIndex: number) {
		if (checkedWeekDays.includes(weekDayIndex)) {
			setCheckedWeekDays((prevState) => {
				return prevState.filter((weekD) => weekD !== weekDayIndex);
			});
		} else {
			setCheckedWeekDays((prevState) => [...prevState, weekDayIndex]);
		}
	}

	return (
		<View className='flex-1 bg-background px-8 pt-14'>
			<ScrollView
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{ paddingBottom: 30 }}
			>
				<BackButton />

				<Text className='mt-6 text-white font-extrabold text-3xl leading-tight'>
					Criar Hábito
				</Text>

				<Text className='mt-6 text-white font-semibold text-base'>
					Qual seu novo compremetimento?
				</Text>

				<TextInput
					className='h-12 pl-4 rounded-lg mt-3 bg-zinc-900 text-white border-2 border-zinc-800 focus:border-green-500'
					placeholder='Ex.: Exercícios, Dormir cedo, etc. '
					placeholderTextColor={colors.zinc[500]}
				/>

				<Text className='mt-6 text-white font-semibold text-base'>
					Qual a recorrência planejada?
				</Text>
				<View className='mt-3'>
					{availableWeekDays.map((day, i) => {
						return (
							<Checkbox
								key={day}
								title={day}
								checked={checkedWeekDays.includes(i)}
								onPress={() => {
									handleToggleWeekDay(i);
								}}
							/>
						);
					})}
				</View>

				<TouchableOpacity
					activeOpacity={0.7}
					className='w-full h-16 flex-row justify-center items-center bg-green-600 mt-6 rounded-xl'
				>
					<Feather name='check' size={24} color={colors.white} />
					<Text className='ml-2 text-white font-semibold text-base'>Confirmar</Text>
				</TouchableOpacity>
			</ScrollView>
		</View>
	);
}
