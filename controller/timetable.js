const { model } = require("mongoose");
const axios = require("axios");
const Course = require("../models/course");
const Lecturer = require("../models/lecturer");
const { Room } = require("../models/room");
const { response } = require("express");
const Timetable = require("../models/tinetable");
const { error } = require("winston");

const sendTimetabledata = async (req, res) => {
  console.log(req.body);

  const timetable = new Timetable({
    uid: req.body.timetableId
  })

  await timetable.save()

  const data = req.body

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
  console.log(req.query.current_progress)
  console.log(data);
  
  await Timetable.findOneAndUpdate({ uid: req.query.timetableId}, { 
    current_progress: req.params.current_progress,
    name : req.body.timetableName,
    session : req.body.academicSession,
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
  const timetable = await Timetable.findOne({ uid: req.query.timetableId })
  console.log(timetable)
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


