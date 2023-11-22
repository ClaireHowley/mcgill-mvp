import React, { useState, useEffect } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";

function Home() {
	const [genre, setGenre] = useState("");
	const [time, setTime] = useState("");
	const [year, setYear] = useState("");
	const [randomMovie, setRandomMovie] = useState(null);
	const [error, setError] = useState("");
	const [hasSearched, setHasSearched] = useState(false);
	const [movieHistory, setMovieHistory] = useState([]);

	//options for genre, time, year questions
	//label as appears on front end
	//value as sent to the back end
	const genres = [
		{ label: "Select", value: "null" },
		{ label: "Action", value: "Action" },
		{ label: "Comedy", value: "Comedy" },
		{ label: "Crime", value: "Crime" },
		{ label: "Drama", value: "Drama" },
		{ label: "Family", value: "Family" },
		{ label: "Musical", value: "Musical" },
		{ label: "Romance", value: "Romance" },
		{ label: "Science Fiction", value: "Science Fiction" },
		{ label: "Thriller", value: "Thriller" },
		{ label: "War", value: "War" },
	];

	//event handler functions to select and set genre, time, year answers
	const handleGenreSelect = (event) => {
		//assign event target / the option clicked
		const genre = event.target.value;
		reset();
		//set this as the genre, time, year etc
		setGenre(genre);

		console.log(genre);
	};

	const times = [
		{ label: "Select", value: null },
		{ label: "Up to 90 minutes", value: "90" },
		{ label: "Up to 120 minutes", value: "120" },
		{ label: "Up to 180 minutes", value: "180" },
		{ label: "Up to 240 minutes", value: "240" },
		{ label: "Up to 300 minutes", value: "300" },
	];

	const handleTimeSelect = (event) => {
		const time = event.target.value;

		setTime(time);
		reset();
		console.log(time);
	};

	const years = [
		{ label: "Select", value: null },
		{ label: "1970s", value: "1970" },
		{ label: "1980s", value: "1980" },
		{ label: "1990s", value: "1990" },
		{ label: "2000s", value: "2000" },
		{ label: "2010s", value: "2010" },
	];

	const handleYearSelect = (event) => {
		const year = event.target.value;

		setYear(year);
		reset();
		console.log(year);
	};

	//function to get random movie suggestion based on the question inputs

	const navigate = useNavigate();

	const getRandomMovie = async () => {
		try {
			console.log(genre);
			console.log(time);
			console.log(year);
			//fetch from api if any of the 3 questions have been answered
			//if not questions answered / no input then the function won't work
			if (genre || time || year) {
				let response = await fetch(
					`/api/movies/random?genre=${genre}&time=${time}&year=${year}`,
					{
						headers: {
							authorization: `Bearer ${localStorage.getItem("token")}`,
						},
					}
				); //headers --> badge here
				if (response.ok) {
					//update based on api response / random movie
					let movieDisplay = await response.json();
					console.log(movieDisplay[0]);
					//set random movie with the first object
					setRandomMovie(movieDisplay[0]);
					//set to true so error message can display if needed
					setHasSearched(true);
				} else {
					setError(
						"Uh oh, we weren't able to find a match. Click Movie Generator to try again."
					);
				}
			}
		} catch (err) {
			setError(
				"Uh oh, we weren't able to find a match. Click Movie Generator to try again."
			);
		}
	};

	const addMovieHistory = async (movieid) => {
		try {
			console.log("Payload:", { movieid });
			const response = await fetch("http://localhost:5173/api/moviehistory", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${localStorage.getItem("token")}`,
				},
				body: JSON.stringify({ movieid: movieid }),
			});
			const movieHistoryData = await response.json();

			setMovieHistory(movieHistoryData);
		} catch (error) {
			console.error("Oops, something went wrong", error);
		}
	};

	//submit function to call on getRandomMovie function
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log(e.target.value);
		getRandomMovie(genre, time, year);
	};

	//click function to add to movie history
	const handleClick = async (movieID) => {
		console.log(movieID);
		await addMovieHistory(movieID);
		navigate("/moviehistory");
	};

	//function to reset values / remove movie suggestion -- works on changing the selected values
	function reset() {
		setRandomMovie(null);
		setError("");
		setHasSearched(false);
	}

	return (
		<div className="pageContainer">
			<div className="movieGeneratorBox">
				<h1 className="titleMovieGenerator">Movie Generator</h1>
				<form onSubmit={handleSubmit}>
					<div className="centered">
						<label className="questions">
							What are you in the mood for?
							<select
								className="form-select"
								name="genre"
								onChange={handleGenreSelect}
								value={genre}>
								{/* map through different options, display .label in the form-select */}
								{genres.map((genre) => (
									<option key={genre.value} value={genre.value}>
										{genre.label}
									</option>
								))}
							</select>
						</label>{" "}
					</div>

					<div className="centered">
						<label className="questions">
							How long have you got?
							<select
								className="form-select"
								name="time"
								onChange={handleTimeSelect}
								value={time}>
								{times.map((time) => (
									<option key={time.value} value={time.value}>
										{time.label}
									</option>
								))}
							</select>
						</label>
					</div>

					<div className="centered">
						<label className="questions">
							When was it released?
							<select
								className="form-select"
								name="year"
								onChange={handleYearSelect}
								value={year}>
								{years.map((year) => (
									<option key={year.value} value={year.value}>
										{year.label}
									</option>
								))}
							</select>
						</label>
					</div>
					<div>
						<div className="buttonSection">
							<button type="submit" className="button">
								Submit
							</button>
						</div>
					</div>
				</form>
			</div>
			{randomMovie ? (
				<div className="results">
					<img
						src={`/posters/${randomMovie.MovieID}.jpg`}
						alt="Movie Poster"
						style={{ maxWidth: "250px", height: "auto" }}
					/>
				</div>
			) : (
				// display error message if no movie is found and hasSearched is set to true
				hasSearched && (
					<div className="errorMessage">
						Uh oh, we weren't able to find a match. Try again!
					</div>
				)
			)}
			<div>
				{" "}
				{randomMovie && (
					<button
						className="addHistoryButton"
						onClick={() => handleClick(randomMovie.MovieID)}>
						Add
					</button>
				)}
			</div>
		</div>
	);
}

export default Home;
