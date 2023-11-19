import { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import "../App.css";

export default function App() {
	const [movies, setMovies] = useState([]);
	// const [movie, setMovie] = useState({
	//   movienmame: "",
	//   moviedirector: "",
	//   movieyear: ""
	// });

	const [profile, setProfile] = useState(null);

	useEffect(() => {
		getMovies();
	}, []);

	//fetch all movies from the api / movies table
	async function getMovies() {
		try {
			const response = await fetch("/api/movies");
			if (!response.ok) {
				throw new Error("Oops, something went wrong");
			}
			const data = await response.json();
			setMovies(data);
		} catch (error) {
			console.error("Oops, something went wrong");
		}
	}

	return (
		<div>
			<h1 className="titleAllMovies">All Movies</h1>
			<div className="movieList">
				{movies.map((m) => (
					<div key={m.MovieID}>
						<Link to={`/movies/${m.MovieID}`}>
							{m.MovieName} ({m.MovieDirector}, {m.MovieYear})
						</Link>
					</div>
				))}
			</div>
			<Outlet />
		</div>
	);
}
