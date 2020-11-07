const mongoose = require('mongoose');
const timetable = require('../controller/timetable');
const Schema = mongoose.Schema;

const TimetableSchema = new Schema({
    courses: {
        type: Array
    },
    timetable_name: {
        type: String
    },
    academic_section: {
        type: String
    },
    Timetable_id: {
        type: String
    },
    current_progress: {
        type: Number
    }
})

const Timetable = mongoose.model('timetable', TimetableSchema);

module.exports =  Timetable
