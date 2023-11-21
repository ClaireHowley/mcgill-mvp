const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn"); // guard

const supersecret = process.env.SUPER_SECRET;

router.post("/login", async (req, res) => {
	const { username, password } = req.body;

	try {
		const results = await db(
			`SELECT * FROM users WHERE username = "${username}"`
		);
		const user = results.data[0];
		if (user) {
			const user_id = user.userid;

			const correctPassword = await bcrypt.compare(password, user.password);

			if (!correctPassword) throw new Error("Incorrect password");

			var token = jwt.sign({ user_id }, supersecret);
			res.send({
				message: "Login successful, here is your token",
				token,
				user_id,
			}); // with user_id the frontend will know who is the user is
		} else {
			throw new Error("User does not exist");
		}
	} catch (err) {
		res.status(400).send({ message: err.message });
	}
});

module.exports = router;
