export const MODEL_CONTROLLER = 'model' as const;

export const MODEL_ROUTES = {
	GET_ALL: 'all',
	CREATE: '',
	UPDATE: (id: string) => `${id}`,
	DELETE: (id: string) => `${id}`,
} as const;
