import { TouchableOpacity, View, Text, TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';

interface CheckboxProps extends TouchableOpacityProps {
	title: string;
	checked?: boolean;
}

export function Checkbox({ title, checked = false, ...rest }: CheckboxProps) {
	const checkedStyle = checked ? 'bg-green-500' : 'bg-zinc-900 border-2 border-zinc-800';

	return (
		<TouchableOpacity activeOpacity={0.7} className='flex-row mb-2 items-center' {...rest}>
			<View className={`${checkedStyle} h-10 w-10 rounded-lg items-center justify-center`}>
				{checked && <Feather name='check' size={24} color={colors.white} />}
			</View>

			<Text className='text-white text-base font-semibold ml-3'>{title}</Text>
		</TouchableOpacity>
	);
}
