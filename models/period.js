const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PeriodSchema = new Schema({
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    course: { type: Schema.Types.ObjectId, ref: 'Course'}
});

const Period = mongoose.model("Period", PeriodSchema)

module.exports = Period