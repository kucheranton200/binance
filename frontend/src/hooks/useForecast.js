import { useState, useEffect } from 'react';
import { makeForecast, getHistory } from '../services/api';

export function useForecast() {
	const [result, setResult] = useState(null);
	const [history, setHistory] = useState([]);

	const loadHistory = async () => {
		try {
			const res = await getHistory();
			setHistory(res.data);
		} catch (err) {
			console.error('Failed to load history', err);
		}
	};

	const forecast = async (modelId) => {
		try {
			const res = await makeForecast(modelId);
			setResult(res.data);
			await loadHistory(); // обновляем историю после прогноза
		} catch (err) {
			console.error('Forecast failed', err);
		}
	};

	// **Добавляем useEffect для загрузки истории при монтировании**
	useEffect(() => {
		loadHistory();
	}, []);

	return {
		result,
		history,
		forecast,
		loadHistory,
	};
}
