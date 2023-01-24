import { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import { api } from '../lib/axios';

interface DayDetailResponse {
	possibleHabits:
		| {
				id: string;
				title: string;
				created_at: string;
		  }[]
		| undefined;
	completedHabitsIds?: string[] | undefined;
}

export function useFetchDay(date: string) {
	const [loading, setLoading] = useState(true);
	const [habits, setHabits] = useState<DayDetailResponse>({
		possibleHabits: [],
		completedHabitsIds: []
	});

	async function fetchDay() {
		try {
			console.log(date);
			setLoading(true);
			const { possibleHabits, completedHabitsIds } = (
				await api.get('/day', { params: { date } })
			).data;
			setHabits({ possibleHabits, completedHabitsIds });
		} catch (err) {
			Alert.alert('Erro', 'Não foi possível carregar os dados do dia atual');
			console.error(err);
		} finally {
			setLoading(false);
		}
	}

	useEffect(() => {
		fetchDay();
	}, []);

	return { habits, setHabits, loading };
}
