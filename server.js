// Imports
const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const models = require("./models");

// Socket.IO
const { createServer } = require("http");
const io = require("socket.io")();

// Require database connection
require("./config/db.connection");

// Use .env variables
require("dotenv").config();

const port = process.env.PORT || 4000;
const app = express();

// Middleware CORS
app.use(cors());

// Middleware JSON parsing
app.use(express.json());

// Middleware API routes
app.use("/api/v1/quizzes", routes.quizzes);
app.use("/api/v1/auth", routes.auth);
app.use("/api/v1/user", routes.user);

// Listen
app.listen(port, () => console.log(`The server is running on Port: ${port}`));

const users = {};
const lobbies = {};

io.on("connection", (socket) => {
  socket.id = socket.handshake.query.userId;

  socket.on("create-lobby", async () => {
    if (lobbies[socket.id]) return;

    lobbies[socket.id] = {
      name: (await models.User.findById(socket.id)).username,
      users: [],
    };

    io.emit("lobbies", Object.entries(lobbies));
  });

  socket.on("get-lobbies", () => {
    socket.emit("lobbies", Object.entries(lobbies));
  });

  socket.on("join-lobby", (lobbyId) => {
    if (lobbies[lobbyId].users.length < 4) {
      if (!lobbies[lobbyId].users.includes(socket.id)) {
        lobbies[lobbyId].users.push(socket.id);
      }

      socket.broadcast.emit("lobbies", Object.entries(lobbies));
      socket.join(`room-${lobbyId}`);
      socket.emit("lobby", { lobbyId: lobbyId });
    } else {
      socket.emit("lobby", { error: "full" });
    }
  });

  socket.on("get-lobby", (lobbyId) => {
    socket.emit("lobby", lobbies[lobbyId]);
  });
});

io.listen(5000);
