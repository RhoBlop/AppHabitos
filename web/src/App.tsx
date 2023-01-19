import './styles/global.css';
import { TableHeader } from './components/TableHeader';

export function App() {
	return (
		<div className='w-screen h-screen bg-background text-white flex justify-center items-center'>
			<div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
				<TableHeader />
			</div>
		</div>
	);
}
