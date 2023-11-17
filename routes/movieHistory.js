import { Router } from "express";
import userShouldBeLoggedIn from "../guards/usersShouldBeLoggedIn";
const db = require("../model/helper");
const express = require("express");
const router = express.Router();

router.post("/moviehistory", userShouldBeLoggedIn, async (req, res) => {
	const { userid, movieid } = req.body; // what is in the request

	try {
		console.log(
			"Received request with userid:",
			userid,
			"and movieid:",
			movieid
		);

		if (!userid || !movieid) {
			res.status(404).json({ error: "User or movie not found" });
		}

		await db(
			`INSERT INTO moviehistory (userid, movieid) VALUES ("${userid}", "${movieid}")`
		);
		res.send({ message: "added to movie history" });
	} catch (error) {
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

// why not user.userid or movie.movie.id

module.exports = router;
