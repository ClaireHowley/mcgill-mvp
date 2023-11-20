import React, { useState, useEffect } from "react";
import "../App.css";

export default function MovieHistory() {
	const [movieHistory, setMovieHistory] = useState([]);

	useEffect(() => {
		addMovieHistory();
	}, []); // Empty dependency array means this effect runs once after the initial render

	return (
		<div>
			{movieHistory.map((movie) => (
				<div key={movie.MovieID}>
					{movie.Title} - {movie.ReleaseYear}
				</div>
			))}
		</div>
	);
}
