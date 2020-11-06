const { model } = require("mongoose");
const axios = require("axios");
const Course = require("../models/course");
const Lecturer = require("../models/lecturer");
const { Room } = require("../models/room");

// classES
// "Classes": [{
//     "Subject": "Test Subject 1",
//     "Type": "Theory",
//     "Professor": "Vujosevic Dusan",
//     "Groups": ["301", "302", "303", "304", "305", "306", "307", "308", "309", "309a"],
//     "AllowedClassrooms": "n",
//     "Length": "2"
// }, {
//     "Subject": "Test Subject 2",
//     "Type": "Theory",
//     "Professor": "Vujosevic Dusan",
//     "Groups": ["301", "302", "303", "304", "305", "306", "307", "308", "309", "309a", "2s1", "2s2"],
//     "AllowedClassrooms": "k",
//     "Length": "2"
// }

//https://coursekit-timetable.herokuapp.com/generate/

const sendTimetabledata = async (req, res) => {
  // const SUBJECT = await Course.aggregate([{ $project: { name: 1, _id: 0 } }]);
  // const LT = await Room.aggregate([
  //   { $match: { type: "LT" } },
  //   { $project: { name: 1, _id: 0 } },
  // ]);
  // const NLT = await Room.aggregate([
  //   { $match: { type: "NLT" } },
  //   { $project: { name: 1, _id: 0 } },
  // ]);
  // const Professor = await Lecturer.aggregate([
  //   { $project: { name: 1, _id: 0 } },
  // ]);
  // console.log(SUBJECT);
  // console.log(LT, NLT);
  // console.log(Professor);
  const data = req.body;

  async function makePostRequest() {
    let res = await axios.get(
      "https://coursekit-timetable.herokuapp.com/generate/",
      data
    );

    console.log(res.data);
  }

  makePostRequest();
};

const receivedata = (req, res) => {
  const data = req.body;
  console.log(T);
  res.status(200).json({});
};

module.exports = { sendTimetabledata, receivedata };
