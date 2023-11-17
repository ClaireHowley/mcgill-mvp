// App.js
import React, { useEffect, useState } from "react";
import { Route, Routes, Link, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Movie from "./pages/Movie";
import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import MovieHistory from "./pages/MovieHistory.jsx";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);

	const navigate = useNavigate();

	function onLogin() {
		setIsLoggedIn(true);
		navigate("/app");
	}

	return (
		<>
			<div className="homepage">
				<div className="titleMain">
					<h1>GoodMovies for GoodFellas</h1>
				</div>{" "}
				<div className="subheading">
					<h4>Which Robert de Niro movie should you watch?</h4>
				</div>
				<img
					src={`/posters/main.png`}
					alt="De Niro"
					style={{ maxWidth: "1000px", height: "auto" }}
					className="mainImage"
				/>
				<nav>
					<div className="menu">
						<div>
							<button>
								<Link to="/">Movie Generator</Link>
							</button>
							<button>
								<Link to="/movies">All Movies</Link>
							</button>
							<button>{!isLoggedIn && <Link to="/login">Login</Link>}</button>
							<button>
								{" "}
								{!isLoggedIn && <Link to="/register">Sign Up</Link>}
							</button>
							<button>
								{isLoggedIn && <Link to="/moviehistory">History</Link>}
							</button>
						</div>
					</div>
				</nav>
			</div>

			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/movies" element={<Movies />} />
				<Route path="/movies/:MovieID" element={<Movie />} />
				<Route path="/login" element={<Login onLogin={onLogin} />} />
				<Route path="/register" element={<Register onLogin={onLogin} />} />
				<Route path="/moviehistory" element={<MovieHistory />} />
			</Routes>
		</>
	);
}
