import { Dimensions, TouchableOpacity } from 'react-native';

const WEEK_DAYS = 7;
const DAY_MARGIN_BETWEEN = 8; // day margin

// total of day margin per row
const TOTAL_DAYS_MARGIN_BETWEEN = DAY_MARGIN_BETWEEN * WEEK_DAYS;
const SCREEN_HORIZONTAL_PADDING = 32 * 2;
// total of space that will be used for spacing (margin/padding)
const HORIZONTAL_DISCOUNT = TOTAL_DAYS_MARGIN_BETWEEN + SCREEN_HORIZONTAL_PADDING;

export const DAY_SIZE = (Dimensions.get('screen').width - HORIZONTAL_DISCOUNT) / WEEK_DAYS;

export function TableDay() {
	return (
		<TouchableOpacity
			className='bg-zinc-900 rounded-lg border-2 m-1 border-zinc-800'
			style={{ width: DAY_SIZE, height: DAY_SIZE }}
			activeOpacity={0.7}
		/>
	);
}
