const express = require("express");
const router = express.Router();
const db = require("../model/helper");

// movies?genre=action&time=120&year=2010
//get all moves
router.get("/", async function (req, res, next) {
	try {
		const results = await db(`SELECT * FROM movies`);
		res.send(results.data);
	} catch (err) {
		res.status(500).send(err);
	}
});

//get random movie
//if genre, time, and/or year have a value then add to the url
//and add to query to get from api
//put results in random order, limit to 1 so only 1 is presented
router.get("/random", async function (req, res, next) {
	let { genre, time, year } = req.query;

	let query = `
  SELECT * FROM movies 
  WHERE 1 = 1`;

	if (genre) {
		query += ` AND MovieGenre LIKE "%${genre}%"`;
	}
	if (time) {
		query += ` AND MovieLength <= ${time}`;
	}
	if (year) {
		const endYear = +year + 10;
		query += ` AND MovieYear >= ${year} AND MovieYear < ${endYear}`;
	}
	query += ` ORDER BY RAND() LIMIT 1;`;
	console.log(query);
	try {
		let results = await db(query);
		let genre = results.data;
		res.send(genre);
	} catch (err) {
		res.status(500).send({ error: err.message });
	}
});

module.exports = router;
