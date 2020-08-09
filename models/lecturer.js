const mongoose = require('mongoose');
const Schema = mongoose.Schema

const LecturerSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    image: {
        type: String
    },
    ranking: {
        type: String
    },
    degree: {
        type: String
    },
    office_no: {
        type: String,
        required: true
    },
    phone_no: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
    },
    areaOfSpec: {
        type: String,
        required: true
    },
    education_bg: {
        type: String,
        required: true
    },
    unavailablePeriods: {
        type: String,
    },
    Courses: [{ type: Schema.Types.ObjectId, ref: 'Course', default: null }]
})

const Lecturer = mongoose.model("Lecturer", LecturerSchema)

module.exports = Lecturer 