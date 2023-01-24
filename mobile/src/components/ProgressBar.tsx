import { View } from 'react-native';

interface ProgressBarProps {
	progress?: number;
}

export function ProgressBar({ progress = 0 }: ProgressBarProps) {
	return (
		<View className='w-full h-3 rounded-lg bg-zinc-700 mt-4 overflow-hidden'>
			<View className='rounded-lg bg-violet-600 h-3' style={{ width: `${progress}%` }} />
		</View>
	);
}
