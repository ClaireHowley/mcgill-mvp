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

	const removeFromHistory = async (index) => {
		try {
			const movieIdToRemove = movieHistoryList[index].movieid;

			// Remove the movie locally
			const updatedMovieHistory = [...movieHistoryList];
			updatedMovieHistory.splice(index, 1);
			setMovieHistoryList(updatedMovieHistory);

			// Remove the movie from the server
			await fetch(`http://localhost:5173/api/moviehistory/${movieIdToRemove}`, {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
			});

			// Fetch the updated list (optional)
			displayMovieHistory();
		} catch (error) {
			console.error("Error removing movie:", error);
		}
	};

	return (
		<div className="movieHistory">
			{movieHistoryList &&
				movieHistoryList.map((item, index) => (
					<div key={item.historyid} className="movieHistoryItem">
						<img
							src={`/posters/${item.movieid}.jpg`}
							alt="Movie Poster"
							style={{ maxWidth: "250px", height: "auto" }}
						/>
						<div className="removeFromHistory">
							<button onClick={() => removeFromHistory(index)}>Remove</button>
						</div>
					</div>
				))}
		</div>
	);
}

// const removeFromHistory = (index) => {
// 	const updatedList = [...movieHistoryList];
// 	updatedList.splice(index, 1);
// 	setMovieHistoryList(updatedList);
// };
