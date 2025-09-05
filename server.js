import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// current state of rolls
let diceState = {
    rolls: [],
    counts: [0, 0, 0, 0, 0, 0],
    sixStats: [0, 0, 0, 0],
    sixStreak: 0,
    noSixStreak: 0,
    longestNoSixStreak: 0,
};

// Endpoint to get state
app.get("/state", (req, res) => {
    res.json(diceState);
});

// Endpoint to set state
app.post("/state", (req, res) => {
    diceState = req.body;
    res.json({ status: "ok" });
});

app.listen(4000, () => {
    console.log("Server runs at http://localhost:4000");
});
