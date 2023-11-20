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

// //getone random joke that is not in the current user's library
// router.get('/random', async function(req, res, next) {
//   // console.log("getting a random joke")
//   try {
//       const {user_id} = req.query;
//       const joke = await db(`SELECT * FROM jokes WHERE jokes.id not in (select joke_id from usersJokes where user_id = ${user_id}) ORDER BY RAND() LIMIT 1;`)
//       res.send(joke.data[0]);
//   }catch (err) {
//       res.status(500).send(err);
//   }
//   });

//   From the frontend:
// // gets a random joke that the user does not already own from the library
//   async function getJoke () {
//     const resultJSON = await fetch(`/api/jokes/random/?user_id=${currentUser.id}`);
//     const joke = await resultJSON.json();
//     setNewJoke(joke);
//   }
