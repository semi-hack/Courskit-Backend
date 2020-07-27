const mongoose = require('mongoose');
const Schema = mongoose.Schema

const CourseSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    code: {
        type: String,
        required: true,
    },
    unit: {
        type: Number,
        required: true
    },
    lecturer: {type: Schema.Types.ObjectId, ref: 'Lecturer', default: null},
    Venue: {type: Schema.Types.ObjectId, ref: 'Room'},
    time: {
        type: String,
        required: true
    },
})

const Course = mongoose.model("Course", CourseSchema)

module.exports = Course 