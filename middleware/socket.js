const mongoose = require('mongoose');
const { Discussion } = require('../models/discussion');
const { Comment } = require('../models/discussion');
const { isValidObjectId } = require('mongoose');

module.exports = {
    ADD_Discussion : async data => {
        const newDiscussion = await new Discussion({
            title: data.title,
            details: data.details
        }).save();
    },
    ADD_Comment : async data => {
        var comment = {message: data.message, userId: data.userId, _id: data._id}
        return await Discussion.findByIdAndUpdate(data._id, {$push: {comments:comment}})
        .populate({ path:'comments', populate: [{ path: 'userId', model: 'User'}]})
    }
}