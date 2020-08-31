
const express = require('express');
const bodyParser = require('body-parser');
const connectDB = require('./config/db');
const router = require('./routes/routes');


require('dotenv').config();
connectDB();


/**Socket IO */
const app = express()
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const PORT = process.env.PORT || 4440
const { ADD_Discussion } = require("./middleware/socket");
const { Discussion } = require('./models/discussion');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(router);

io.on('connection', (socket) => {
    console.log("user connected")

    socket.on('topic', params => {
        socket.broadcast.emit("new_discussion", params)
    })


    socket.on('comment', (comment) => {
        io.emit("new_comment", comment)
    })
    
})

server.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})