// src/pages/ResetPassword.jsx
import { Button, Label, TextInput, Checkbox } from 'flowbite-react';
import { useState } from 'react';
import { resetPassword } from '../services/api';
import { Link, useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';


export default function ResetPassword({ onReset }) {
	const [email, setEmail] = useState('');
	const [newPassword, setNewPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [agree, setAgree] = useState(false);
	const [loading, setLoading] = useState(false);
	const [alert, setAlert] = useState(null);

	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!agree) {
			setAlert({
				message: 'Вы должны подтвердить владение аккаунтом',
				type: 'error',
			});
			return;
		}
		if (newPassword !== confirmPassword) {
			setAlert({ message: 'Пароли не совпадают', type: 'error' });
			return;
		}

		setLoading(true);
		setAlert(null);

		try {
			await resetPassword({ email, password: newPassword });
			setAlert({ message: 'Пароль успешно обновлён', type: 'success' });
			setTimeout(() => navigate('/login'), 1500);
		} catch (err) {
			const msg = err.response?.data?.message || 'Ошибка при сбросе пароля';
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
				className="w-full max-w-md space-y-4 rounded-lg bg-slate-800 p-8 shadow-lg">
				<h2 className="text-center text-2xl font-semibold text-white">
					Сброс пароля
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
					<Label
						htmlFor="newPassword"
						value="Новый пароль"
						className="text-gray-400">
						Новый пароль
					</Label>
					<TextInput
						id="newPassword"
						type="password"
						placeholder="0987654321"
						value={newPassword}
						onChange={(e) => setNewPassword(e.target.value)}
						required
						className="bg-slate-700 text-white border-slate-600"
					/>
				</div>

				<div className="flex flex-col gap-1">
					<Label
						htmlFor="confirmPassword"
						value="Подтвердите новый пароль"
						className="text-gray-400">
						Потвердите новый пароль
					</Label>
					<TextInput
						id="confirmPassword"
						type="password"
						placeholder="0987654321"
						value={confirmPassword}
						onChange={(e) => setConfirmPassword(e.target.value)}
						required
						className="bg-slate-700 text-white border-slate-600"
					/>
				</div>

				<div className="flex items-center gap-2">
					<label className="relative inline-flex items-center cursor-pointer">
						<input
							type="checkbox"
							checked={agree}
							onChange={(e) => setAgree(e.target.checked)}
							className="sr-only peer"
						/>
						<div
							className="w-5 h-5 bg-slate-700 border-2 border-gray-500 rounded-md flex items-center justify-center
      peer-checked:bg-indigo-600 peer-checked:border-indigo-600 transition-colors duration-200">
							{agree && (
								<svg
									className="w-3 h-3 text-white"
									fill="none"
									stroke="currentColor"
									strokeWidth="3"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										d="M5 13l4 4L19 7"
									/>
								</svg>
							)}
						</div>
						<span className="ml-2 text-gray-300 select-none">
							Я клянусь что это мой аккаунт
						</span>
					</label>
				</div>

				<Button
					type="submit"
					className="w-full bg-indigo-600 hover:bg-indigo-700">
					Сбросить пароль
				</Button>

				<p className="text-sm text-center text-gray-400">
					Вспомнили пароль?{' '}
					<a href="/login" className="text-indigo-400 hover:underline">
						Войти
					</a>
				</p>
			</form>
		</div>
	);
}
