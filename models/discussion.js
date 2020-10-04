const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId, ref: 'User'
    },
    discussionId: {
        type: Schema.Types.ObjectId, ref: 'Discussion'
    },
    message: {
        type: String
    },
},
 { timestamps: true }
)

const DiscussionSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    createdBy: {
        type: mongoose.Types.ObjectId, ref: 'User'
    },
    details: {
        type: String,
    },
    users: [{ type: Schema.Types.ObjectId, ref: 'User'}],
    type: {
        type: String,
        enum : ['private', 'public'],
    },
    level: {
        type: String
    },
    comments: [{ type: Schema.Types.ObjectId, ref: 'Comments'}]
},
 { timestamps: true }
)


const Comments = mongoose.model('Comments', CommentSchema)

const Discussion = mongoose.model('discussion', DiscussionSchema);

module.exports =  { Discussion , Comments } 