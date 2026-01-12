import { useEffect } from 'react';

export default function Alert({ message, type = 'success', onClose }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, 3000);
		return () => clearTimeout(timer);
	}, [onClose]);

	const bgColor = type === 'success' ? 'bg-green-500' : 'bg-red-500';

	return (
		<div
			className={`fixed top-4 left-1/2 transform -translate-x-1/2 ${bgColor} text-white px-6 py-3 rounded shadow-lg z-50`}>
			{message}
		</div>
	);
}
