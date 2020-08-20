const mongoose = require('mongoose');
const { Discussion } = require('../models/discussion');
const { Comment } = require('../models/discussion');

module.exports = {
    ADD_Discussion : async data => {
        const newDiscussion = await new Discussion({
            title: data.title,
            details: data.details
        }).save();
    },
    // ADD_Comment : async data => {
    //     var comment = {message: data.message, userId: data.userId, discussionId: data.discussionId}
    //     return await Discussion.findByIdAndUpdate({_id: data.DiscussionId},{$push: {comments:comment}})
    //     .populate("userId")
    // }
}