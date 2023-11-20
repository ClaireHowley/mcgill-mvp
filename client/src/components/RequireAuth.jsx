import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../contexts/auth";

export default function RequireAuth({ children }) {
	const { isLoggedIn } = useContext(AuthContext);

	if (!isLoggedIn) {
		<Navigate to="/" />;
	}

	return children;
}
