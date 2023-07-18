require("dotenv").config();

const express = require("express");
const db = require("./db"); // /db will automatically search for an index.js which is why /index.js isn't needed
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001; // Use process.env.PORT if it exists and then 3001 otherwise using simple boolean JS logic (3001 is a default basically)

// Firebase Auth
const admin = require("firebase-admin");
const credentials = require("./firebase-adminsdk.json");

const { initializeApp } = require("firebase/app");
const {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  confirmPasswordReset,
  applyActionCode,
} = require('firebase/auth');

admin.initializeApp({
    credential: admin.credential.cert(credentials)
});

const firebaseConfig = {
    apiKey: "AIzaSyCBPTawukDEmry4FTrf9uWV1j99rZ8QtjA",
    authDomain: "pimon-a3197.firebaseapp.com",
    projectId: "pimon-a3197",
    storageBucket: "pimon-a3197.appspot.com",
    messagingSenderId: "264770850093",
    appId: "1:264770850093:web:3b75039be5dc88fddc97a4",
    measurementId: "G-2GGSW7GV9T"
};

const firebase_app = initializeApp(firebaseConfig);
const auth = getAuth(firebase_app);

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
    });
});

app.post("/api/v1/create-account", async (req, res) => {
    const { uid, email, password } = req.body;
    console.log(uid);

    try {
        const user = await createUserWithEmailAndPassword(auth, email, password);
        res.status(201).json({
            status: "Success",
        });
    } catch (err) {
        res.status(400).json({
            status: "Error",
            code: err.code
        });
    }
});

app.post("/api/v1/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        res.status(200).json({
            status: 'Success',
            user: user,
            email: email,
            password: password
        });
    } catch (err) {
        console.log(err);
        res.status(400).json({
            status: 'Error',
            code: err.code
        });
    }
});

app.get("/api/v1/login-details", (req, res) => {
    const currentUser = auth.currentUser;

    if (currentUser) {
        res.status(200).json({
            loggedIn: true,
            user: currentUser,
            uid: currentUser.uid,
            email: currentUser.email
        });
    } else {
        res.status(200).json({
            loggedIn: false
        });
    }
});

app.delete("/api/v1/logout", async (req, res) => {
    try {
        await auth.signOut();
        res.status(204).end()
    } catch (err) {
        res.status(500).json({
            status: "error"
        })
    }
});

// : essentially means variable, called URL parameter
app.get("/api/v1/characters/:uid", async (req, res) => {
    console.log(`Retrieved character info for UID: ${req.params.uid}`);
    try {
        const result = await db.query('SELECT * FROM characters WHERE uid=$1 ORDER BY id ASC;', [req.params.uid]);
        res.status(200).json({
            status: "Success",
            data: {
                characters: result.rows
            }
        });
    } catch (err) {
        console.log('This was triggered');
        console.log(err);
    }
});

app.post("/api/v1/characters/:uid", async (req, res) => {
    try {
        console.log('Look here:');
        console.log(req);
        console.log("This is the sent data:");
        const { name, level, weapon } = req.body.data;
        console.log(name);
        console.log(level);
        console.log(weapon);
        const result = await db.query(
            'INSERT INTO characters (uid, name, level, weapon) VALUES ($1, $2, $3, $4) RETURNING id;',
            [req.params.uid, name, level, weapon]
          );
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
        });
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
        await db.query(`DELETE FROM characters WHERE uid=$1 AND id=$2;`, [req.params.uid, req.params.id]);
        res.status(204).json({
            status: "Success"
        });
    } catch (err) {
        console.log(err);
    }
});

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});