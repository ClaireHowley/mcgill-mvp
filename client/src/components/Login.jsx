import { useState, useContext } from "react";
import AuthContext from "../contexts/auth";
import axios from "axios";

export default function Login() {
	const { onLogin } = useContext(AuthContext);

	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const { username, password } = credentials;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const login = async () => {
		try {
			const { data } = await axios("/api/auth/login", {
				method: "POST",
				data: credentials,
			});

			//store it locally
			localStorage.setItem("token", data.token);
			onLogin();
		} catch (error) {}
	};

	const logout = () => {
		localStorage.removeItem("token");
	};

	return (
		<div className="loginBox">
			<div className="username">
				<label htmlFor="usernameInput">Username:</label>
				<input
					type="text"
					id="usernameInput"
					name="username"
					value={username}
					onChange={handleChange}
				/>
			</div>

			<div className="password">
				<label htmlFor="passwordInput">Password:</label>
				<input
					type="password"
					id="passwordInput"
					name="password"
					value={password}
					onChange={handleChange}
				/>
			</div>
			<button onClick={login}>Login</button>
		</div>
	);
}
