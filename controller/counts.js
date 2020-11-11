const { Klass } = require("../models/class");
const Course = require("../models/course");
const Lecturer = require("../models/lecturer");
const { Room } = require("../models/room");
const User = require("../models/user");
const Event = require("../models/event");

const result = async (req, res) => {
  const room = await Room.find({}).estimatedDocumentCount();
  const lecturer = await Lecturer.find({}).estimatedDocumentCount();
  const course = await Course.find({}).estimatedDocumentCount();
  const user = await User.find({}).estimatedDocumentCount();
  const classes = await Klass.find({}).estimatedDocumentCount();
  const event = await Event.find({}).estimatedDocumentCount();


  if ( room ) {
    return res.status(200).json({
      success: true,
      rooms: room,
      lecturers: lecturer,
      courses: course,
      students: user,
      classess: classes,
      events: event
    });
  } else {
    return res.status(404).json({
      error: "no rooms found",
    });
  }
};

module.exports = { result }