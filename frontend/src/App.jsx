import { useState } from 'react';
import {
	BrowserRouter as Router,
	Routes,
	Route,
	Navigate,
} from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ResetPassword from './pages/ResetPassword';

function App() {
	const [user, setUser] = useState('user');

	const handleLogout = () => {
		localStorage.removeItem('token');
		setUser(null);
	};

	const handleReset = async ({ email, newPassword }) => {
		console.log('Сброс пароля для', email, newPassword);
		return { success: true };
	};

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						user ? (
							<Dashboard user={user} onLogout={handleLogout} />
						) : (
							<Navigate to="/login" />
						)
					}
				/>
				<Route path="/login" element={<Login onLogin={setUser} />} />
				<Route path="/register" element={<Register onRegister={setUser} />} />
				<Route
					path="/reset-password"
					element={<ResetPassword onReset={handleReset} />}
				/>
			</Routes>
		</Router>
	);
}

export default App;
