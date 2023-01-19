import './styles/global.css';
import logoImage from './assets/logo.svg';
import { AddOutline } from 'react-ionicons';

export function App() {
	return (
		<div className='w-screen h-screen bg-background text-white flex justify-center items-center'>
			<div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
				<div className='w-full max-w-3xl mx-auto flex flex-row justify-between items-center'>
					<img src={logoImage} alt='' />
					<button
						type='button'
						className='border border-violet-500 rounded-lg font-semibold px-6 py-4'>
						<AddOutline color={'#00000'} height='50px' width='50px' />
						Adicionar Hábito
					</button>
				</div>
			</div>
		</div>
	);
}
