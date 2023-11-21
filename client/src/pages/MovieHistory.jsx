import React from "react";
import "../App.css";
import { useEffect, useState } from "react";

export default function MovieHistory() {
	const [movieHistoryList, setMovieHistoryList] = useState([]);

	const displayMovieHistory = async () => {
		try {
			const response = await fetch("http://localhost:5173/api/moviehistory", {
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});
			const movieHistoryData = await response.json();
			console.log("Movie History Data:", movieHistoryData);
			setMovieHistoryList(movieHistoryData);
		} catch (error) {
			console.error("Oops, something went wrong", error);
		}
	};

	useEffect(() => {
		displayMovieHistory();
	}, []);

	return (
		<div>
			{movieHistoryList &&
				movieHistoryList.map((item) => (
					<div key={item.historyid}>
						<img
							src={`/posters/${item.movieid}.jpg`}
							alt="Movie Poster"
							style={{ maxWidth: "250px", height: "auto" }}
						/>
					</div>
				))}
		</div>
	);
}
