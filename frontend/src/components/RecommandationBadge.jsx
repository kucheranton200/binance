export default function RecommendationBadge({ trend }) {
	const isBuy = trend === 'UP';

	return (
		<span
			className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-semibold
			${
				isBuy
					? 'bg-green-500/15 text-green-400 border border-green-500/30'
					: 'bg-red-500/15 text-red-400 border border-red-500/30'
			}`}>
			{isBuy ? 'Покупать' : 'Продавать'}
		</span>
	);
}
