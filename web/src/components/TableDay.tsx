import * as Popover from '@radix-ui/react-popover';
import { ProgressBar } from './ProgressBar';

interface TableDayProps {
	amount: number;
	completed: number;
}

export function TableDay({ amount, completed }: TableDayProps) {
	const progressPercentage = Math.round((completed / amount) * 100);
	const colorClassName =
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

	return (
		<Popover.Root>
			<Popover.Trigger className={`${colorClassName} w-10 h-10 border-2 rounded-lg`} />

			<Popover.Portal>
				<Popover.Content className='min-w-[320px] px-5 py-4 rounded-2xl bg-zinc-900 flex flex-col'>
					<span className='font-semibold text-zinc-400/60 leading-tight'>
						sexta-feira
					</span>
					<span className='font-extrabold leading-tight text-2xl mt-1'>20/01</span>

					<ProgressBar progress={progressPercentage} />

					<Popover.Arrow className='fill-zinc-900 h-2 w-4' />
				</Popover.Content>
			</Popover.Portal>
		</Popover.Root>
	);
}
