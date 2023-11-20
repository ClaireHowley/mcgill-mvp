const express = require("express");
const router = express.Router();
const db = require("../model/helper");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRounds = 10;
// const userShouldBeLoggedIn = require("../guards/userShouldBeLoggedIn"); // guard

const supersecret = process.env.SUPER_SECRET;

router.post("/register", async (req, res) => {
	const { username, password } = req.body;

	try {
		const hash = await bcrypt.hash(password, saltRounds);

		await db(
			`INSERT INTO users (username, password) VALUES ("${username}", "${hash}")`
		);

		res.send({ message: "Register successful" });
	} catch (err) {
		res.status(400).send({ message: err.message });
	}
});

module.exports = router;
