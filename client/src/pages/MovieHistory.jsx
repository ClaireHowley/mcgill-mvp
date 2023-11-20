import React, { useState, useEffect } from "react";
import "../App.css";

export default function MovieHistory() {
	const [movieHistory, setMovieHistory] = useState([]);

	const addMovieHistory = async () => {
		try {
			const response = await fetch("/api/moviehistory", {
				headers: {
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			if (!response.ok) {
				throw new Error(
					`Server responded with status ${response.status}: ${errorMessage}`
				);
			}

			const movieHistoryData = await response.json();
			setMovieHistory(movieHistoryData);
		} catch (error) {
			console.error("Oops, something went wrong", error);
		}
	};

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
