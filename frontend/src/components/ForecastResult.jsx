import React from 'react';

export default function ForecastResult({ result }) {
	if (!result) return null;

	return (
		<div className="bg-green-100 p-4 rounded shadow mt-4">
			<p>
				<strong>Predicted Price:</strong> {result.predictedPrice}
			</p>
			<p>
				<strong>Difference:</strong> {result.difference}
			</p>
			<p>
				<strong>Recommendation:</strong>{' '}
				<span
					className={
						result.recommendation === 'BUY' ? 'text-green-600' : 'text-red-600'
					}>
					{result.recommendation}
				</span>
			</p>
		</div>
	);
}
