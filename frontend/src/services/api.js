import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
	baseURL: API_URL,
});

// Auth
export const register = (data) => api.post('/auth/register', data);
export const login = (data) => api.post('/auth/login', data);
export const resetPassword = (data) => api.post('/auth/reset-password', data);

// Models & Forecasts
export const getModels = () => api.get('/model/all');
export const makeForecast = (id) =>
	api.post('/crypto/predict', { modelId: id });
export const getHistory = () => api.get('/crypto/history');

// Interceptor for JWT
api.interceptors.request.use((config) => {
	const token = localStorage.getItem('token');
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export default api;
