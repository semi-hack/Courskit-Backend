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

    await period.save((err) => {
        period.populate("course", (err) => {
            console.log(period.course)
        })
    })
    return res.json({
      success: true,
      data: period,
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
    const data = await Period.find({});
    if (!data) {
      res.status(404).json({
        success: false,
        message: "not found",
      });
      return;
    } else {
      res.status(200).json({
        success: true,
        data,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
};

// delete a period
const DeletePeriod = async (req, res) => {
  const { id } = req.body;
  try {
    const data = await Period.findOneAndDelete({ _id: req.body.id });
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
module.exports = { createPeriod, getAllPeriods, DeletePeriod };
