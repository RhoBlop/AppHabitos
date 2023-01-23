import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { Check } from 'phosphor-react';

interface Checkbox {
	id: string;
	title: string;
	checked?: boolean;
}

export function Checkbox({ id, title, checked = false }: Checkbox) {
	const boxStyle = checked ? 'bg-green-500' : 'bg-zinc-900 border-2 border-zinc-800';
	const textStyle = checked ? 'line-through text-zinc-400' : 'text-white';

	return (
		<div className='flex flex-row items-center gap-3'>
			<RadixCheckbox.Root
				className={`${boxStyle} h-8 w-8 rounded-lg flex items-center justify-center`}
				id={id}
				checked={checked}
			>
				<RadixCheckbox.Indicator>
					<Check size={22} className='text-white' />
				</RadixCheckbox.Indicator>
			</RadixCheckbox.Root>

			<label className={`${textStyle} text-white text-base font-semibold`} htmlFor={id}>
				{title}
			</label>
		</div>
	);
}
