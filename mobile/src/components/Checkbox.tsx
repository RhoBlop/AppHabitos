import { TouchableOpacity, View, Text, TouchableOpacityProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import colors from 'tailwindcss/colors';
import { memo } from 'react';

interface CheckboxProps extends TouchableOpacityProps {
	title: string;
	checked?: boolean;
	onChangeChecked?: Function;
}

export const Checkbox = memo(function Checkbox({ title, checked = false, ...rest }: CheckboxProps) {
	const checkedStyle = checked ? 'bg-green-500' : 'bg-zinc-900 border-2 border-zinc-800';
	console.log(`${title} re-rendered ${checked}`);

	return (
		<TouchableOpacity activeOpacity={0.7} className='flex-row mb-2 items-center' {...rest}>
			<View className={`${checkedStyle} h-10 w-10 rounded-lg items-center justify-center`}>
				{checked && <Feather name='check' size={24} color={colors.white} />}
			</View>

			<Text className='text-white text-base font-semibold ml-3'>{title}</Text>
		</TouchableOpacity>
	);
}, arePropsEqual);

function arePropsEqual(oldProps: CheckboxProps, newProps: CheckboxProps) {
	return oldProps.title === newProps.title && oldProps.checked === newProps.checked;
}
