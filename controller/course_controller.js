const express = require("express");
const mongoose = require("mongoose");
const generateColor = require('generate-color')
const Course = require("../models/course");

// create a Room
const createCourse = async (req, res) => {
  const { name, code, unit, time, day, venue, description, level } = req.body;

  try {
    const existingcourse = await Course.findOne({ name: req.body.name }).exec();
    if (existingcourse) {
        return res.status(401).json({
          message: "name already taken",
        });
    }

    const colorCode = generateColor.default()

    const course = new Course({
        name,
        code,
        unit,
        day,
        time,
        venue,
        description,
        level,
        colorCode
    });
    await course.save(() => {
      Course.findOne({name : req.body.name}).populate('venue')
      .exec((err, course) => {
        console.log(course.venue.name)
      });
    });

    return res.json({
        success: true,
        data: course,
    });
  } catch (error) {
    return res.status(500).json({
        error: 'There was an error.',
        success: false
    });
  }
}

// get all courses
const GetAllCourses = async (req, res) => {
  const courses = await Course.find({}).populate('venue').populate('lecturer');
  if (courses) {
    return res.status(200).json({
        success: true,
        data: courses
     });
  } else {
    return res.status(404).json({
      error: "no course found",
    });
  }
};

// get course by id
const GetCourseById = async (req, res) => {
  const { id } = req.body
  const course = await Course.findOne({_id: req.body.id}).populate('venue').populate('lecturer')
  if (courses) {
    return res.status(200).json({
      success: true,
      data: courses
    });
  } else {
    return res.status(404).json({
      error: "no course found",
    })
  }
};

// get course by level
const GetCourseByLevel = async(req, res) => {
  const { level } = req.headers
  const courses = await Course.find({ level: req.headers.level}).populate('venue').populate('lecturer')
  if (courses) {
    return res.status(200).json({
      success: true,
      message: "gotten",
      data: courses
    });
  } else {
    return res.status(404).json({
      error: "no course found",
    })
  }
};

//update a course
const UpdateCourse = async (req, res) => {
    const { _id } = req.headers
    const UpdatedCourse = await Course.findByIdAndUpdate(req.headers._id, {$set: req.body});
    if (!UpdatedCourse) {
        res.status(400).json({
            message: "failed to update"
        });
    } else {
        res.json({
            success: true,
            message: UpdatedCourse
        });
    }

}



// delete a Course
const DeleteCourse = async (req, res) => {

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
module.exports = { createCourse, GetAllCourses, GetCourseById, GetCourseByLevel,  UpdateCourse, DeleteCourse };
