import { useState } from 'react';
import { useModels, useForecast } from '../hooks';
import { Button, Select } from 'flowbite-react';
import ForecastChart from '../components/ForecastChart';
import RecommendationBadge from '../components/RecommandationBadge';

const SYMBOLS = ['BTCUSDT', 'ETHUSDT'];
const INTERVALS = ['5m', '15m', '30m', '1h', '2h','4h', '8h', '1d'];
const TRAINING_PERIODS = ['3m', '6m', '1y', '2y'];

export default function Dashboard({ onLogout }) {
	const { models } = useModels();
	const { result, history, forecast } = useForecast();
	const [selectedModel, setSelectedModel] = useState(null);
	const [filterSymbol, setFilterSymbol] = useState('');
	const [filterInterval, setFilterInterval] = useState('');
	const [filterPeriod, setFilterPeriod] = useState('');

	// Фильтруем модели по выбранным enum
	const filteredModels = models.filter(
		(m) =>
			(!filterSymbol || m.symbol === filterSymbol) &&
			(!filterInterval || m.interval === filterInterval) &&
			(!filterPeriod || m.trainingPeriod === filterPeriod)
	);

	const handleSubmitQuery = async (e) => {
		e.preventDefault();
		if (!selectedModel) return;
		await forecast(selectedModel.id);
	};

	return (
		<div className="flex flex-col min-h-screen bg-slate-900 text-white">
			<header className="flex items-center px-6 py-4 bg-slate-800 shadow-md">
				{/* Лого + текст */}
				<div className="flex items-center gap-4">
					<img
						src="/logo.png"
						alt="Crypto Thieves logo"
						className="w-14 h-14 rounded-2xl"
					/>

					<div className="flex flex-col leading-tight">
						<span className="text-xl font-bold text-white tracking-wide">
							Crypto Thieves
						</span>
						<span className="text-sm text-gray-400">
							AI-powered crypto forecasting
						</span>
					</div>
				</div>

				{/* Spacer */}
				<div className="flex-1" />

				{/* Logout */}
				<Button color="light" onClick={onLogout}>
					Выйти
				</Button>
			</header>

			<main className="flex flex-1 px-4 gap-4">
				{/* Сайдбар с фильтром */}
				<aside className="w-88 bg-slate-800 p-4 rounded-lg shadow-lg flex flex-col gap-4 history-scrollbar max-h-[80vh]">
					<h2 className="text-lg font-semibold text-gray-300 text-center">
						Модели
					</h2>

					{/* Фильтры */}
					<div className="flex flex-col gap-2">
						<Select
							value={filterSymbol}
							onChange={(e) => setFilterSymbol(e.target.value)}
							placeholder="Symbol">
							<option value="">Все символы</option>
							{SYMBOLS.map((s) => (
								<option key={s} value={s}>
									{s}
								</option>
							))}
						</Select>

						<Select
							value={filterInterval}
							onChange={(e) => setFilterInterval(e.target.value)}
							placeholder="Interval">
							<option value="">Все интервалы</option>
							{INTERVALS.map((i) => (
								<option key={i} value={i}>
									{i}
								</option>
							))}
						</Select>

						<Select
							value={filterPeriod}
							onChange={(e) => setFilterPeriod(e.target.value)}
							placeholder="Training Period">
							<option value="">Все периоды</option>
							{TRAINING_PERIODS.map((p) => (
								<option key={p} value={p}>
									{p}
								</option>
							))}
						</Select>
					</div>

					{/* Список моделей */}
					<div className="flex-1 overflow-y-auto max-h-[70vh]">
						{filteredModels.map((model) => (
							<div
								key={model.id}
								className={`p-2 rounded-xl cursor-pointer mb-3 ${
									selectedModel?.id === model.id
										? 'bg-indigo-600'
										: 'bg-slate-700 hover:bg-slate-600'
								}`}
								onClick={() => setSelectedModel(model)}>
								<span>{model.name}</span>
							</div>
						))}
						{filteredModels.length === 0 && (
							<p className="text-gray-400 mt-2 text-sm">
								Нет моделей по фильтру
							</p>
						)}
					</div>
				</aside>

				{/* Прогноз */}
				<div className="flex-1 flex flex-col gap-4">
					<section className="flex-1 bg-slate-800 p-6 rounded-lg shadow-lg flex flex-col items-center">
						{!selectedModel ? (
							<p className="text-gray-400">
								Выберите модель слева, чтобы делать прогноз
							</p>
						) : (
							<form
								onSubmit={handleSubmitQuery}
								className="w-full max-w-xl flex flex-col gap-4">
								<h2 className="text-xl font-semibold text-white text-center mb-4">
									{selectedModel.name} — Прогноз
								</h2>
								<Button
									type="submit"
									className="w-full bg-indigo-600 hover:bg-indigo-700">
									Получить прогноз
								</Button>

								{result && (
									<>
										<div className="mt-4 p-4 bg-slate-700 rounded-md border border-gray-600 text-center">
											<p>Текущая цена: {result.currentPrice.toFixed(2)}</p>{' '}
											<p>
												Прогнозируемая цена: {result.predictedPrice.toFixed(2)}
											</p>
											<p>Изменение: {result.diffPercent.toFixed(2)}%</p>
											<p
												className={`font-semibold ${
													result.trend === 'UP'
														? 'text-green-400'
														: 'text-red-400'
												}`}>
												<div className="mt-2 flex justify-center">
													<RecommendationBadge trend={result.trend} />
												</div>
											</p>
											<div className="mt-3 text-left">
												<h3 className="font-semibold mb-2 text-center">
													Подробный прогноз
												</h3>
												<ForecastChart
													currentPrice={result.currentPrice}
													prediction={result.prediction}
													diffPercent={result.diffPercent}
												/>
											</div>
										</div>
									</>
								)}
							</form>
						)}
					</section>
				</div>

				{/* История */}
				<aside className="w-96 bg-slate-800 p-4 rounded-lg shadow-lg flex flex-col gap-2 overflow-y-auto max-h-[80vh] history-scrollbar">
					<h2 className="text-lg font-semibold text-gray-300 mb-2 text-center">
						История
					</h2>
					{history.length === 0 && (
						<p className="text-gray-400">Нет запросов</p>
					)}
					{history.map((h, index) => (
						<div key={index} className="p-2 bg-slate-700 rounded-md text-sm">
							<p className="text-gray-300">Модель: {h.modelName}</p>
							<p>Дата: {new Date(h.createdAt).toLocaleString('ru-RU')}</p>
							<p>Текущая цена: {h.currentPrice.toFixed(2)}</p>
							<p>Прогноз: {h.predictedPrice.toFixed(2)}</p>
							<p>Изменение: {h.diffPercent.toFixed(2)}%</p>
							<p
								className={`font-semibold ${
									h.trend === 'UP' ? 'text-green-400' : 'text-red-400'
								}`}>
								Рекомендация: {h.trend === 'UP' ? 'Покупать' : 'Продавать'}
							</p>
						</div>
					))}
				</aside>
			</main>

			<footer className="p-4 text-center text-gray-400 bg-slate-800">
				© Crypto Thieves Ind. All rights reserved.
			</footer>
		</div>
	);
}
