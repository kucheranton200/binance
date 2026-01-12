import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	ResponsiveContainer,
	ReferenceLine,
	Area,
} from 'recharts';

export default function ForecastChart({ currentPrice, prediction, diffPercent }) {
	const chartData = [
		{ id: "current", name: 'Текущая', price: +currentPrice.toFixed(2) },
        ...prediction.map((p, idx) => ({
            id: `step-${idx + 1}`,
			name: `Шаг ${p.step}`,
			price: p.price,
		})),
	];

	return (
		<div className="w-full h-64 mt-4">
			<ResponsiveContainer width="100%" height="100%">
				<LineChart data={chartData}>
					<CartesianGrid strokeDasharray="3 3" stroke="#555" />
					<XAxis
						dataKey="name"
						stroke="#ccc"
						padding={{ left: 20, right: 20 }}
					/>
					<YAxis
						stroke="#ccc"
						domain={['dataMin', 'dataMax']}
						width={80}
						tickFormatter={(value) => value.toFixed(2)}
						padding={{ top: 20, bottom: 20 }}
					/>
					<Tooltip
						formatter={(value, name, props) => [
							value.toFixed(2),
							name,
							{ style: { color: '#fff', fontWeight: 500 } }, // берем цвет линии и делаем чуть светлее
						]}
						contentStyle={{
							backgroundColor: '#1e293b',
							borderRadius: 5,
							border: 'none',
							padding: '0.5rem 1rem',
						}}
						labelStyle={{ color: '#fff', fontWeight: 600 }}
					/>
					<ReferenceLine
						y={currentPrice}
						stroke="#10b981"
						strokeDasharray="3 3"
						label="Текущая цена"
					/>
					<Line
						type="monotone"
						dataKey="price"
						stroke={diffPercent > 0 ? '#4ade80' : '#f87171'}
						strokeWidth={2}
						dot={{
							stroke: diffPercent > 0 ? '#4ade80' : '#f87171',
							strokeWidth: 2,
						}}
					/>
				</LineChart>
			</ResponsiveContainer>
		</div>
	);
}
