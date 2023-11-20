import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../App.css";

export default function Movie() {
	const [movie, setMovie] = useState({});
	const { MovieID } = useParams();
	console.log(MovieID);

	useEffect(() => {
		getMovie();
	}, [MovieID]);

	//fetch move using movieID from the api / movies table
	async function getMovie() {
		const response = await fetch(`/api/movie/${MovieID}`);
		const data = await response.json();
		setMovie(data);
	}
	let navigate = useNavigate();

	return (
		<div>
			<div className="movieInfo">
				<div>Movie Title: {movie.MovieName} </div>
				<div>Directed By: {movie.MovieDirector} </div>
				<div>Year of Release: {movie.MovieYear} </div>
				<div>Genre: {movie.MovieGenre} </div>
				<div>Runtime: {movie.MovieLength} minutes </div>
				<div className="moviePoster">
					<img
						src={`/posters/${MovieID}.jpg`}
						alt="Movie Poster"
						style={{ maxWidth: "250px", height: "auto" }}
					/>
				</div>
			</div>
			{/* back to all movies page */}
			<div className="buttonSection" id="singleButton">
				<button className="button" onClick={() => navigate(-1)}>
					Back
				</button>
			</div>
		</div>
	);
}
