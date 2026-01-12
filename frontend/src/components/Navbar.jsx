export default function Navbar({ user, onLogout }) {
	return (
		<nav className="bg-blue-600 text-white px-4 py-3 flex justify-between">
			<h1 className="font-bold text-lg">Crypto Forecast</h1>
			{user ? (
				<div className="flex items-center gap-4">
					<span>{user.email}</span>
					<button
						onClick={onLogout}
						className="bg-white text-blue-600 px-2 py-1 rounded">
						Logout
					</button>
				</div>
			) : null}
		</nav>
	);
}
