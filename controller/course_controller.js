const express = require("express");
const mongoose = require("mongoose");
const generateColor = require("generate-color");
const Course = require("../models/course");

// create a course
const createCourse = async (req, res) => {
  const {
    name,
    code,
    unit,
    time,
    day,
    venue,
    description,
    lecturer,
    level,
  } = req.body;

  try {
    const existingcourse = await Course.findOne({ name: req.body.name }).exec();
    if (existingcourse) {
      return res.status(401).json({
        message: "name already taken",
      });
    }

    const colorCode = generateColor.default();

    const course = new Course({
      name,
      code,
      unit,
      day,
      time,
      venue,
      description,
      level,
      lecturer,
      colorCode,
    });
    await course.save();

    const data = await Course.findOne({ name: req.body.name }).populate(
      "lecturer"
    );

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

// get all courses
const GetAllCourses = async (req, res) => {
  const { page, perPage } = req.query;
  const options = {
    page: parseInt(page, 10) || 1,
    limit: parseInt(perPage, 10) || 10,
  };
  const courses = await Course.find({}).populate("venue").populate("lecturer");
  if (courses) {
    return res.status(200).json({
      success: true,
      data: courses,
    });
  } else {
    return res.status(404).json({
      error: "no course found",
    });
  }
};

// get course by id
const GetCourseById = async (req, res) => {
  const { id } = req.body;
  const course = await Course.findOne({ _id: req.body.id })
    .populate("venue")
    .populate("lecturer");
  if (course) {
    return res.status(200).json({
      success: true,
      data: course,
    });
  } else {
    return res.status(404).json({
      error: "no course found",
    });
  }
};

// get course by level
const GetCourseByLevel = async (req, res) => {
  const { level } = req.headers;
  const courses = await Course.find({ level: req.headers.level })
    .populate("venue")
    .populate("lecturer");
  if (courses) {
    return res.status(200).json({
      success: true,
      message: "gotten",
      data: courses,
    });
  } else {
    return res.status(404).json({
      error: "no course found",
    });
  }
};

//update a course
const UpdateCourse = async (req, res) => {
  const { _id } = req.headers;
  const existingName = await Course.findOne({ name: req.body.name });
  if (existingName) {
    return res.status(401).json({
      message: "name already taken",
    });
  } else {
    const UpdatedCourse = await Course.findByIdAndUpdate(
      req.headers._id,
      { $set: req.body },
      { new: true }
    );
    if (!UpdatedCourse) {
      res.status(400).json({
        message: "failed to update",
      });
    } else {
      res.json({
        success: true,
        message: UpdatedCourse,
      });
    }
  }
};

//search for a course
const search = async (req, res) => {
  const { q } = req.query;

  try {
    const result = await Course.find({ $text: { $search: req.query.q } })
      .populate("venue")
      .populate("lecturer");
    if (result) {
      return res.status(200).json({
        success: true,
        message: "gotten",
        data: result,
      });
    } else {
      return res.status(404).json({
        error: "no course found",
      });
    }
  } catch (error) {
    return res.status(500).json({
      error: "There was an error.",
      success: false,
    });
  }
};

// delete a Course
const DeleteCourse = async (req, res) => {
  const { _id } = req.headers;
  try {
    const data = await Course.findOneAndDelete({ _id: req.headers._id });
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
module.exports = {
  createCourse,
  GetAllCourses,
  GetCourseById,
  GetCourseByLevel,
  UpdateCourse,
  search,
  DeleteCourse,
};
