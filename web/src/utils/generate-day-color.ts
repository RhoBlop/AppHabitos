export function generateDayColor(amount: number, completed: number) {
	const progressPercentage = Math.round((amount / completed) * 100);
	const style =
		progressPercentage >= 80
			? 'bg-violet-500 border-violet-400'
			: progressPercentage >= 60
			? 'bg-violet-600 border-violet-500'
			: progressPercentage >= 40
			? 'bg-violet-700 border-violet-600'
			: progressPercentage >= 20
			? 'bg-violet-800 border-violet-700'
			: progressPercentage > 0
			? 'bg-violet-900 border-violet-800'
			: 'bg-zinc-900 border-zinc-800';

	return { progressPercentage, colorClassName: style };
}
