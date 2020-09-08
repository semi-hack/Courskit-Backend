const express = require('express');
const mongoose = require('mongoose');
const { Discussion, Comments } =  require('../models/discussion');
const { isValidObjectId } = require('mongoose');
const { callbackPromise } = require('nodemailer/lib/shared');


const createDiscussion = async (req, res) => {
    const { title, details, createdBy } = req.body

    try {
        const discuss = await Discussion.findOne({ title: req.body.title}).exec()
        if(discuss) {
            return res.status(401).json({
                message: "title exists"
            });
        }
        const discussion = new Discussion({
            title,
            details,
            createdBy
        });

        
        await discussion.save()

        const data = await Discussion.findOne({ title: req.body.title}).populate('createdBy')
        
        return res.json({
            success: true,
            data: data
        });
    } catch (error) {
        return res.status(500).json({
            error: 'There was an error.',
            success: false
        });
    }
}

const getAllDiscussion = async (req, res) => {
    const discussion = await Discussion.find({}).populate('createdBy')
    if (discussion) {
        return res.status(200).json({
            success: true,
            data: discussion
        });
    } else {
        return res.status(404).json({
            success: false,
            error: "no course found"
        })
    }
}


const comment = async (req, res) => {
    const { _id } = req.headers

    const comm = new Comments({
        message: req.body.message,
        userId: req.body.userId
    })
    await comm.save()

    const result = await Discussion.findByIdAndUpdate( req.headers._id, {
        $push: {comments:comm}
    }, { 
        new: true    
    }).populate({ path:'comments', populate: [{ path: 'userId', model: 'User'}]})
    if(!result) {
        return res.status(400)
    } else {
        return res.status(200).json({
            message: "comments",
            data: result
        })
    }

    
}

const updateDiscussion = async(req, res) => {
    const { _id } = req.headers;
    const updateDiscussion = await Discussion.findByIdAndUpdate(req.headers._id, {$set: req.body}, { new: true });
    if (!updateDiscussion) {
        res.status(400).json({
            message: "failed to update"
        });
    } else {
        res.json({
            success: true,
            message: updateDiscussion
        });
    }
}

const deleteDiscussion = async (req, res) => {
    const { _id } = req.headers;
    try {
        const data = await Discussion.findOneAndDelete({ _id: req.headers._id});
        if (!data) {
            res.status(404).json({ success: false, message: 'not found' });
            return;
        }
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }

}


module.exports = {createDiscussion, getAllDiscussion, updateDiscussion, deleteDiscussion,  comment }