const express = require("express");
const mongoose = require("mongoose");
const Course = require("../models/course");

// create a Room
const createCourse = async (req, res) => {
  const { name, capacity } = req.body;

  try {
    const existingcourse = await Course.findOne({ name: req.body.name }).exec();
    if (existingcourse) {
        return res.status(401).json({
          message: "name already taken",
        });
    }

    const course = new Course({
        name,
        capacity
    });
    await course.save()
    return res.json({
        success: true,
        data: course
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
  const courses = await Course.find({});
  if (courses) {
    return res.status(200).json({
        success: true,
        data: courses });
  } else {
    return res.status(404).json({
      error: "no course found",
    });
  }
};

//update a course
const UpdateCourse = async (req, res) => {
    const UpdateCourse = await Course.findOneAndUpdate(req.params._id, {$set: reqbody});
    if (err) {
        res.status(400).json({
            message: "failed to update"
        });
    } else {
        res.json({
            success: true,
            message: UpdateCourse
        });
    }

}

// delete a Course
const DeleteCourse = async (req, res) => {
  const course = await Course.findOneAndDelete({ name: req.params.name });
  if (course) {
    return res.status(200);
  } else {
    return res.status(404).json({
      error: `No room with name ${req.params.name} found`,
    });
  }
};

module.exports = { createRoom, GetAllRooms, updateRoom, DeleteRoom };
