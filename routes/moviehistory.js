const db = require("../model/helper");
const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/usersShouldBeLoggedIn"); // not import from..

router.post("/", userShouldBeLoggedIn, async (req, res) => {
	const { movieid } = req.body; // what is in the request
	// console.log(req.body);
	const userid = req.user_id; // you have token in frontend, don't pass user id in req.body
	// console.log(userid);
	try {
		// console.log("User ID:", userid);
		// console.log("Movie ID:", movieid);
		if (!userid || movieid === undefined) {
			return res.status(400).json({ error: "Invalid user or movie ID" });
		}

		await db(
			`INSERT INTO moviehistory (userid, movieid) VALUES ("${userid}", "${movieid}")`
		);
		res.send({ message: "added to movie history" });
	} catch (error) {
		console.error("Error in movie history route:", error);
		return res.status(500).json({ error: "Internal Server Error" });
	}
});

router.get("/", userShouldBeLoggedIn, async (req, res) => {
	const userid = req.user_id;
	try {
		const results = await db(
			`SELECT * FROM moviehistory WHERE userid = ${userid}`
		);
		const userhistory = results.data;
		res.send(userhistory);
	} catch (err) {
		console.error("Error fetching movie history:", err);
		res
			.status(500)
			.json({ error: "Internal Server Error", details: err.message });
	}
});

module.exports = router;
