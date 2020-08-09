const express = require('express');
const mongoose = require("mongoose");
const Lecturer = require('../models/lecturer');


const createLecturer = async (req, res) => {
    const {
        name,
        email,
        unavailablePeriods,
        courses,
        education_bg,
        phone_no,
        office_no,
        ranking,
        areaOfSpec

    } = req.body

    const lecturer = await Lecturer.create({
            name,
            email,
            unavailablePeriods,
            courses,
            education_bg,
            phone_no,
            office_no,
            ranking,
            areaOfSpec
        });

        if (!lecturer) {
            res.status(400).json({
                success: false,
                message: "lecturer not created"
            });
        }
        res.json({
            success: true,
            message: "lecturer created",
            data: lecturer
        });
    
}

const getAllLecturer = async (req, res) => {
    try {
        const data = await Lecturer.find({})
        if(!data) {
            res.status(404).json({
                success: false,
                message: "not found"
            });
            return
        } else {
            res.status(200).json({
                success: true,
                data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    };
}

const getLecturerById = async (req, res) => {
    const { id } = req.body;

    try {
        const data = await Lecturer.findOne({_id:req.body.id})
        if(!data) {
            res.status(404).json({
                success: false,
                message: "not found"
            });
            return
        } else {
            res.status(200).json({
                success: true,
                data
            });
        }
    } catch (error) {
        console.log(error);
        res.status(400).json(error);
    };
}

const UpdateLecturer = async (req, res) => {
    const { _id } = req.headers
    const UpdatedLecturer = await Lecturer.findByIdAndUpdate(req.headers._id, {$set: req.body});
    if (!UpdatedLecturer) {
        res.status(400).json({
            message: "failed to update"
        });
    } else {
        res.json({
            success: true,
            message: UpdatedLecturer
        });
    }

}

const UploadImage = async (req, res) => {
    console.log(req.file)
    const image = {}
    const UpdatedLecturerImage = await Lecturer.findByIdAndUpdate(req.headers._id, {$set: {"image": req.file.path}});
    if (!UpdatedLecturerImage) {
        res.status(400).json({
            message: "failed"
        });
    } else {
        res.json({
            success: true,
            message: UpdatedLecturerImage
        });
    }

}

// delete a lecturer
const Deletelecturer = async (req, res) => {

    const { id } = req.body;
    try {
        const data = await Room.findOneAndDelete({ _id: req.body.id});
        if (!data) {
            res.status(404).json({ success: false, message: 'not found' });
            return;
        }
        res.json({ success: true });
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
};
module.exports = { createLecturer, getAllLecturer, getLecturerById, UpdateLecturer, UploadImage, Deletelecturer }