require("dotenv").config();

const express = require("express");
const db = require("./db"); // /db will automatically search for an index.js which is why /index.js isn't needed
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Use process.env.PORT if it exists and then 3001 otherwise using simple boolean JS logic (3001 is a default basically)

app.use(express.json());

app.use((req, res, next) => {
    console.log("Yay our middleware man!");
    next();
});

app.use((req, res, next) => {
    console.log("Yay our second middleware man!");
    next();
});

app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );

// https://localhost:3001/getRestaurants
app.get("/api/v1/news", (req, res) => {
    console.log("Retrieved news");
    res.status(200).json({
        status: "Success",
        data: {
            placeholder: ["pee pee", "poo poo"]
        }
    })
});

// : essentially means variable, called URL parameter
app.get("/api/v1/characters/:uid", async (req, res) => {
    console.log(`Retrieved character info for UID: ${req.params.uid}`);
    try {
        const result = await db.query(`SELECT * FROM characters WHERE uid=${req.params.uid} ORDER BY id ASC;`);
        res.status(200).json({
            status: "Success",
            data: {
                characters: result.rows
            }
    })
    } catch (err) {
        console.log(`${err}`);
    }
});

app.post("/api/v1/characters/:uid", async (req, res) => {
    try {
        console.log("This is the sent data:");
        const { name, level, weapon } = req.body.data;
        console.log(name);
        console.log(level);
        console.log(weapon);
        const result = await db.query(`INSERT INTO characters (uid, name, level, weapon) VALUES (${req.params.uid}, '${name}', ${level}, '${weapon}') RETURNING id;`)
        res.status(201).json({
            status: "Success",
            data: {
                characters: {
                    uid: req.params.uid,
                    name: name,
                    level: level,
                    weapon: weapon,
                    id: result.rows[0].id
                }
            }
        })
        console.log("This is the auto-generated unique id: ");
        console.log(result.rows[0].id);
    } catch (err) {
        console.log(err);
    }
});

app.delete("/api/v1/characters/:uid/:id", async (req, res) => {
    try {
        console.log("This is what's getting deleted:");
        console.log(req.params.uid);
        console.log(req.params.id);
        await db.query(`DELETE FROM characters WHERE uid=${req.params.uid} AND id=${req.params.id};`)
        res.status(204).json({
            status: "Success"
        })
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});