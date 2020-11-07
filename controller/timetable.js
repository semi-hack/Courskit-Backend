const { model } = require("mongoose");
const axios = require("axios");
const Course = require("../models/course");
const Lecturer = require("../models/lecturer");
const { Room } = require("../models/room");
const { response } = require("express");
const Timetable = require("../models/tinetable");
const { error } = require("winston");

const sendTimetabledata = async (req, res) => {
  const data = req.body;
  console.log(data);

  const timetable = new Timetable({
    timetable_id: req.body.timetable-id
  })

  await timetable.save()

  var config = {
    method: "get",
    url: "https://coursekit-timetable.herokuapp.com/generate/",
    headers: {
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      const result = JSON.stringify(response.data)
      return res.json({
        data: result
      })
    })
    .catch(function (error) {
      console.log(error);
    });
};

const receivedata = async (req, res) => {

  const data = req.body;
  console.log(req.params.current_progress)
  console.log(data);
  
  await Timetable.findOneAndUpdate({ timetable_id: req.params.timetable-id}, { 
    current_progress: req.params.current_progress,
    timetable_name :req.body.timetable-name,
    academic_section : req.body.academic-section,
    courses : req.body.courses
   }, (err, timetable) => {
     if (err) {
       console.log(err)
     } else
     res.status(200).json({
      data: timetable
    });
  })

};

const progress = async (req, res) => {
  const timetable = await Timetable.findOne({ timetable_id: req.params.timetable-id})
  if (!timetable) {
    return res.json({
      error: "error"
    })
  } else {
    return res.json({
      data: timetable
    })
  }
}

module.exports = { sendTimetabledata, receivedata, progress };


