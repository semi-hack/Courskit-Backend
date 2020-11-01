const { model } = require("mongoose");
const Course = require("../models/course");
const { Room } = require("../models/room");

// classroom eg Lt: type of classroom
let classrooms = {
    "lT": ["Atelje"],
    "nlTk": ["Kolarac"],
    "k": ["U1", "U8"],
    "s": ["Studio"]
}


const sendTimetabledata = (req, res) => {
    const { classrooms, classes } = req.body
    const classroom = await Course.find({})
    const room = await Room.find({})
    console.log(classroom.name, room.name)
}

const receivedata = (req, res) => {
    const T = req.body
    console.log(T)
    res.status(200)
}

module.exports = {sendTimetabledata , receivedata}