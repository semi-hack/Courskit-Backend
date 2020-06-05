const mongoose = require('mongoose');
const Schema = mongoose.Schema

const PeriodSchema = new Schema({
    startTime: {
        type: Date
    },
    endTime: {
        type: Date
    },
    course: [{ type: Schema.Types.ObjectId, ref: 'Course'}]
});

const Period = mongoose.model('Period', PeriodSchema)

module.exports = { Period };