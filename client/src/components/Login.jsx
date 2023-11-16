import { useState } from "react";
import axios from "axios";

function Login() {
	const [credentials, setCredentials] = useState({
		username: "test",
		password: "test",
	});
	// the input from the user  //

	// the message from the database //
	const [data, setData] = useState(null);

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
			console.log(data.message, data.token);
			setData(data.message);
		} catch (error) {
			console.log(error);
			setData(error.message);
		}
	};

	const logout = () => {
		localStorage.removeItem("token");
	};

	//GAURDS//
	// if you are logged in, you can add movie to already seen //
	//requestData = add to faves//

	// const requestData = async () => {
	// 	try {
	// 		const { data } = await axios("/api/auth/profile", {
	// 			headers: {
	// 				authorization: "Bearer " + localStorage.getItem("token"),
	// 			},
	// 		});
	// 		setData(data.message);
	// 		console.log(data.message);
	// 	} catch (error) {
	// 		console.log(error);
	// 		setData(error.message);
	// 	}
	// };

	return (
		<div className="loginBox">
			<div className="username">
				<label for="usernameInput">Username:</label>
				<input
					type="text"
					id="usernameInput"
					name="usernameInput"
					value={username}>
					onchange{handleChange}
				</input>
			</div>

			<div className="password">
				<label for="passwordInput">Password:</label>
				<input
					type="password"
					id="asswordInput"
					name="passwordInput"
					value={password}>
					onchange{handleChange}
				</input>
			</div>
			<button>Login</button>
		</div>
	);
}

export default Login;
