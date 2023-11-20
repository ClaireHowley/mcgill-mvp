import { useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../contexts/auth";

export default function Register() {
	const { onRegister } = useContext(AuthContext);

	const [credentials, setCredentials] = useState({
		username: "",
		password: "",
	});

	const { username, password } = credentials;

	const handleChange = (e) => {
		const { name, value } = e.target;
		setCredentials({ ...credentials, [name]: value });
	};

	const register = async () => {
		try {
			const { data } = await axios("/api/auth/register", {
				method: "POST",
				data: credentials,
			});

			//store it locally
			localStorage.setItem("token", data.token);
			onRegister();
			// console.log(data.message, data.token);
			// setData(data.message);
		} catch (error) {
			// console.log(error);
			// setData(error.message);
		}
		// const logout = () => {
		// 	localStorage.removeItem("token");
		// }; // necessary here
	};

	return (
		<div className="registerbox">
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
			<button onClick={register}>Sign Up</button>
		</div>
	);
}
