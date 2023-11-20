import React, { useState, useEffect } from "react";
import "../App.css";

export default function MovieHistory() {
	const [movieHistory, setMovieHistory] = useState([]);

	const addMovieHistory = async (movieid) => {
		try {
			const response = await fetch("/api/moviehistory", {
				method: "POST",

				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			const movieHistoryData = await response.json();
			setMovieHistory(movieHistoryData);
		} catch (error) {
			console.error("Oops, something went wrong");
		}
	};

	return (
		<div>
			{movieHistory.map((movie) => (
				<div key={movie.MovieID}>
					{movie.MovieName}, {movie.MovieYear}
				</div>
			))}
		</div>
	);
}
