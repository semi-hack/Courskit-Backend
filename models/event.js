const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventSchema = new Schema({
    user: [{  type: Schema.Types.ObjectId, ref: 'User' }],
    name: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    time: {
        type: String
    }
},
)

const Event = mongoose.model('event', EventSchema);

module.exports =  Event;