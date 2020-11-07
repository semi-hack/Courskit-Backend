const mongoose = require('mongoose');
const timetable = require('../controller/timetable');
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({
    courses: {
        type: Array
    },
    name: {
        type: String
    },
    section: {
        type: String
    },
    uid: {
        type: String
    },
    current_progress: {
        type: Number
    }
})

const Timetable = mongoose.model('timetable', TimetableSchema);

module.exports =  Timetable
