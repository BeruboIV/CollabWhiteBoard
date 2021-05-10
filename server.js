const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const PORT = process.env.PORT || 3000;

const users = {};

// Middlewares
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "whiteboard.js"));
});

io.on("connection", (socket) => {
    console.log(`A new user has joined: ${socket.id}`);
    socket.on("new-user", (name) => {
        users[socket.id] = name;
        //TODO: Add user to participants list
    });

    socket.on("client-engage", (coors) => {
        io.emit("server-engage", coors);
    });

    socket.on("client-disengage", () => {
        io.emit("server-disengage");
    });
});

http.listen(PORT, () => {
    console.log(`Listening at PORT : ${PORT}....`);
});
