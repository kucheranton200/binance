import React, { useState } from 'react';

export default function CryptoForm({ onSubmit }) {
	const [symbol, setSymbol] = useState('BTCUSDT');
	const [period, setPeriod] = useState('1d');

	const handleSubmit = (e) => {
		e.preventDefault();
		onSubmit({ symbol, period });
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="bg-white p-4 rounded shadow flex flex-col gap-3">
			<label>
				Cryptocurrency:
				<input
					type="text"
					value={symbol}
					onChange={(e) => setSymbol(e.target.value)}
					className="border p-1 rounded w-full"
				/>
			</label>
			<label>
				Period:
				<select
					value={period}
					onChange={(e) => setPeriod(e.target.value)}
					className="border p-1 rounded w-full">
					<option value="1d">1 Day</option>
					<option value="7d">1 Week</option>
					<option value="1m">1 Month</option>
				</select>
			</label>
			<button
				type="submit"
				className="bg-blue-600 text-white px-3 py-2 rounded">
				Get Forecast
			</button>
		</form>
	);
}
