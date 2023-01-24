import { SummaryTable } from './components/SummaryTable';
import { TableHeader } from './components/TableHeader';
import './styles/global.css';

export function App() {
	return (
		<div className='min-w-screen min-h-screen bg-background flex justify-center items-center'>
			<div className='w-full max-w-5xl px-6 flex flex-col gap-16'>
				<TableHeader />
				<SummaryTable />
			</div>
		</div>
	);
}
