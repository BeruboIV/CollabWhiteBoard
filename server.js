const express = require("express");
const app = express();
const http = require("http").Server(app);
const io = require("socket.io")(http);
const path = require("path");
const PORT = process.env.PORT || 5000;

const users = {};

// Middlewares
app.use(express.static(__dirname));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "whiteboard.js"));
});

io.on("connection", (socket) => {
    console.log(`A new user has joined: ${socket.id}`);
    socket.on("new-user", (name) => {
        //COMPLETE: Add user to participants list
        socket.broadcast.emit("add-user", name);
        socket.emit("add-user-new", users); // Update the current (Newly joined user's) participant list
        users[socket.id] = name; // Add the username to the database
    });

    socket.on("client-engage", (info) => {
        io.emit("server-engage", info);
    });

    socket.on("client-disengage", () => {
        io.emit("server-disengage");
    });

    socket.on("client-move", (info) => {
        io.emit("server-move", info);
    });
});

http.listen(PORT, () => {
    console.log(`Listening at PORT : ${PORT}....`);
});
