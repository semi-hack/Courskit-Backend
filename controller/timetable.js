const { model } = require("mongoose");
const axios = require("axios");
const Course = require("../models/course");
const Lecturer = require("../models/lecturer");
const { Room } = require("../models/room");
const { response } = require("express");

const sendTimetabledata = async (req, res) => {
  const data = req.body;
  console.log(data);

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

const receivedata = (req, res) => {
  const data = req.body;
  console.log(data);
  
  res.status(200).json({
    data: data
  });
};

// const progress = (req, res) => {

// }

module.exports = { sendTimetabledata, receivedata };


