const express = require('express');
const mongoose = require("mongoose");

const Period = require('../models/period');


const createPeriod = async (req, res) => {
    const {
        course,
        startTime,
        endTime,
    } = req.body

    const Period = await Lecturer.create({
            course,
            startTime,
            endTime,
        });

        if (!Period) {
            res.status(400).json({
                success: false,
                message: "period not created"
            });
        }
        res.json({
            success: true,
            message: "period created",
            data: Period
        });
    
}

const getAllPeriods = async (req, res) => {
    try {
        const data = await Period.find({})
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

// delete a period
const DeletePeriod = async (req, res) => {

    const { id } = req.body;
    try {
        const data = await Period.findOneAndDelete({ _id: req.body.id});
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
module.exports = { createPeriod, getAllPeriods, DeletePeriod }