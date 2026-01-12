// src/pages/Register.jsx
import { Button, Label, TextInput } from 'flowbite-react';
import { useState } from 'react';
import { register } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

export default function Register({ onRegister }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null); 

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setAlert(null);

		try {
			const res = await register({ email, password });
			localStorage.setItem('token', res.data.token);
			onRegister(res.data.user);
			setAlert({ message: 'Аккаунт успешно создан!', type: 'success' });
			setEmail('');
			setPassword('');

			setTimeout(() => {
				navigate('/');
			}, 1500);
		} catch (err) {
			const msg = err.response?.data?.message || 'Ошибка регистрации';
			setAlert({ message: msg, type: 'error' });
		} finally {
			setLoading(false);
		}
	};

	return (
		<div className="flex min-h-screen items-center justify-center bg-slate-900 px-4">
			{alert && (
				<Alert
					message={alert.message}
					type={alert.type}
					onClose={() => setAlert(null)}
				/>
			)}

			<form
				onSubmit={handleSubmit}
				className="w-full max-w-md space-y-6 rounded-lg bg-slate-800 p-8 shadow-lg">
				<h2 className="text-center text-2xl font-semibold text-white">
					Регистрация
				</h2>

				<div className="flex flex-col gap-1">
					<Label htmlFor="email" value="Почта" className="text-gray-400">
						Почта
					</Label>
					<TextInput
						id="email"
						type="email"
						placeholder="name@example.com"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="bg-slate-700 text-white border-slate-600"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<Label htmlFor="password" value="Пароль" className="text-gray-400">
						Пароль
					</Label>
					<TextInput
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						placeholder="1234567890"
						required
						className="bg-slate-700 text-white border-slate-600"
					/>
				</div>

				<Button
					type="submit"
					className="w-full bg-indigo-600 hover:bg-indigo-700">
					Создать аккаунт
				</Button>

				<p className="text-sm text-center text-gray-400">
					Есть аккаунт?{' '}
					<Link to="/login" className="text-indigo-400 hover:underline">
						Войдите
					</Link>
				</p>
			</form>
		</div>
	);
}
