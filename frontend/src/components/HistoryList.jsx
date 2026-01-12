export default function HistoryList({ history }) {
	if (!history || history.length === 0) return <p>No history yet.</p>;

	return (
		<div className="mt-4">
			<h2 className="font-bold mb-2">History:</h2>
			<ul className="space-y-2">
				{history.map((item, idx) => (
					<li
						key={idx}
						className="border p-2 rounded bg-white shadow flex justify-between">
						<span>
							{item.symbol} ({item.period})
						</span>
						<span>{item.recommendation}</span>
					</li>
				))}
			</ul>
		</div>
	);
}
