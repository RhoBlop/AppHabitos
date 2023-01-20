import { SummaryTable } from './components/SummaryTable';
import { TableHeader } from './components/TableHeader';
import './styles/global.css';

export function App() {
	return (
		<div className='w-screen h-screen bg-background text-white flex justify-center items-center'>
			<div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
				<TableHeader />
				<SummaryTable />
			</div>
		</div>
	);
}
