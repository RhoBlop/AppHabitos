import { Check } from 'phosphor-react';

export function NewHabitForm() {
	return (
		<form className='w-full flex flex-col mt-6'>
			<label htmlFor='title' className='text-lg'>
				Qual seu novo compremetimento?
			</label>
			<input
				type='text'
				id='title'
				className='w-full p-4 bg-zinc-800 text-white placeholder:text-zinc-400 rounded-lg mt-2 focus:outline-zinc-700'
				placeholder='Ex.: Exercícios, dormir cedo, etc...'
				autoComplete='off'
				autoFocus
			/>

			<label htmlFor='' className='text-lg mt-4'>
				Qual a recorrência planejada?
			</label>

			<button
				type='submit'
				className='w-full p-4 bg-green-600 hover:bg-green-500 flex justify-center items-center mt-4 gap-2 rounded-lg'
			>
				<Check size={20} weight='bold' />
				Confirmar
			</button>
		</form>
	);
}
