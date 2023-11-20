const db = require("../model/helper");
const express = require("express");
const router = express.Router();
const userShouldBeLoggedIn = require("../guards/usersShouldBeLoggedIn"); // not import from..

router.post("/", userShouldBeLoggedIn, async (req, res) => {
	const { movieid } = req.body; // what is in the request
	const userid = req.user_id; // you have token in frontend, don't pass user id in req.body
	try {
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

module.exports = router;
