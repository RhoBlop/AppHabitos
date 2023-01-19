import logoImage from '../assets/logo.svg';
import { Plus } from 'phosphor-react';

export function TableHeader() {
	return (
		<div className='w-full max-w-3xl mx-auto flex flex-row justify-between items-center'>
			<img src={logoImage} alt='' />
			<button
				type='button'
				className='font-semibold flex items-center gap-3 px-6 py-4 border border-violet-500 rounded-lg hover:border-violet-800'>
				<Plus size={20} className='text-violet-500' />
				Adicionar Hábito
			</button>
		</div>
	);
}
