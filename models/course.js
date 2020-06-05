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
    professor: {
        type: String,
        required: true
    },
    venue: {
        type: String,
        required: true
    }
})

const Course = mongoose.model("Course", CourseSchema)

module.exports = { Course }