import { useEffect, useState } from 'react';
import { getModels } from '../services/api';

export function useModels() {
	const [models, setModels] = useState([]);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		loadModels();
	}, []);

	const loadModels = async () => {
		setLoading(true);
		try {
			const res = await getModels();
			setModels(res.data);
		} finally {
			setLoading(false);
		}
	};

	return {
		models,
		loading,
		reload: loadModels,
	};
}
