const express = require("express");
const mongoose = require("mongoose");

const Period = require("../models/period");
const Course = require("../models/course");

const createPeriod = async (req, res) => {
  const { course, startTime, endTime } = req.body;

  try {
    const existingperiod = await Period.findOne({
      course: req.body.course,
    }).exec();
    if (existingperiod) {
      return res.status(401).json({
        message: "course in period already exists",
      });
    }

    const period = new Period({
      course,
      startTime,
      endTime,
    });

    await period.save()

    const data = await Period.findOne({ course: req.body.course }).populate('course')

    return res.json({
      success: true,
      data: data,
    });
  } catch (error) {
    return res.status(500).json({
      error: "There was an error.",
      success: false,
    });
  }
};

const getAllPeriods = async (req, res) => {
  try {
    const data = await Period.find({}).populate('course');
    if (!data) {
      res.status(404).json({
        success: false,
        message: "not found",
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        data:data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

const updatePeriod = async(req, res) => {
  const { _id } = req.headers
  const UpdatedPeriod = await Period.findByIdAndUpdate(req.headers._id, {$set: {}}, { new: true }).populate('course');
  if (!UpdatedPeriod) {
      res.status(400).json({
          message: "failed to update"
      });
  } else {
      res.json({
          success: true,
          message: UpdatedPeriod
      });
  }
}

// delete a period
const DeletePeriod = async (req, res) => {
  const { _id } = req.headers;
  try {
    const data = await Period.findOneAndDelete({ _id: req.headers._id });
    if (!data) {
      res.status(404).json({ success: false, message: "not found" });
      return;
    }
    res.json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};
module.exports = { createPeriod, getAllPeriods, updatePeriod, DeletePeriod };
