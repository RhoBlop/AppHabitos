import { ActivityIndicator, View } from 'react-native';

export function Loading() {
	return (
		<View className='flex-1 bg-background justify-center items-center'>
			<ActivityIndicator size='large' color='#7C3AED' />
		</View>
	);
}
