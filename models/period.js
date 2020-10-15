const mongoose = require('mongoose');
const Schema = mongoose.Schema
const mongoosePaginate = require('mongoose-paginate-v2');


const PeriodSchema = new Schema({
    startTime: {
        type: String
    },
    endTime: {
        type: String
    },
    course: { type: Schema.Types.ObjectId, ref: 'Course'}
});

PeriodSchema.plugin(mongoosePaginate);

const Period = mongoose.model("Period", PeriodSchema)

module.exports = Period