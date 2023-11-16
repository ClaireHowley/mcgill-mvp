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

	return;
}

export default Login;
