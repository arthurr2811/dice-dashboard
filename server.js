import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";

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
    io.emit("stateUpdate", diceState);
    res.json({ status: "ok" });
});

// HTTP-Server + Socket.IO
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*", // just for dev purposes
    },
});

// connect to client
io.on("connection", (socket) => {
    console.log("connected to client:", socket.id);
    socket.emit("stateUpdate", diceState);

    socket.on("disconnect", () => {
        console.log("client disconnect", socket.id);
    });
});

// start sever
const PORT = 4000;
httpServer.listen(PORT, () => {
    console.log(`Server runiing at http://localhost:${PORT}`);
});