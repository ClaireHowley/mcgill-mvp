const express = require("express");
const router = express.Router();
const db = require("../model/helper");

// get movie based on movie id
router.get("/:id", async function (req, res, next) {
	const { id } = req.params;
	console.log(id);
	try {
		const results = await db(`SELECT * FROM movies WHERE MovieID = ${id};`);
		console.log(results);
		res.send(results.data[0]);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = router;
