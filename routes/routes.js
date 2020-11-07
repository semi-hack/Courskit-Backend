const express = require('express')
const router = express.Router()
const roomController = require('../controller/Room_controller');
const LecturerController = require('../controller/lecturer_controller');
const courseController = require('../controller/course_controller');
const periodController = require('../controller/period_controller');
const userController = require('../controller/user');
const classController = require('../controller/class_controller');
const discussionController = require('../controller/discussion_controller');
const eventController = require("../controller/event");
const admin = require('../controller/admin');
const user = require('../controller/user');
const Lecturer = require('../models/lecturer');
const { parser } = require('../middleware/upload');
const timetable = require('../controller/timetable');


router.get('/', (req, res) => {
    res.send("welcome to home page");
})

//
router.post('/admin/create', admin.signupAd);
router.post('/admin/login', admin.adminlogin);
router.get('/admin/loggedIn', admin.getAdmin);

//Admin Routes
router.post('/Admin/room', roomController.createRoom);
router.get('/Admin/room', roomController.GetAllRooms);
router.patch('/Admin/room/:id', roomController.updateRoom);
router.delete('/Admin/room/delete', roomController.DeleteRoom);

//router.post('/Admin/lecturer', LecturerController.createLecturer);
router.get('/Admin/getlecturer', LecturerController.getAllLecturer);
router.patch('/Admin/lecturer/update', LecturerController.UpdateLecturer);
router.delete('/Admin/lecturer/delete', LecturerController.Deletelecturer);
router.route('/Admin/lecturer/image').post(parser.single('image'), LecturerController.createLecturer);
router.route('/image').patch(parser.single('image'), LecturerController.UploadImage);
router.route('/admin/v2/lecturer/update').patch(parser.single('image'), LecturerController.lecturerUpdate)


router.post('/Admin/course', courseController.createCourse);
router.get('/Admin/getCourse', courseController.GetAllCourses);
router.patch('/Admin/course/update', courseController.UpdateCourse);
router.delete('/Admin/course/delete', courseController.DeleteCourse);
//mobile
router.get('/Admin/v2/getCourse', courseController.GetCourseAll);
//

router.post('/Admin/period', periodController.createPeriod);
router.get('/Admin/getPeriod', periodController.getAllPeriods);
router.patch('/Admin/period/update', periodController.updatePeriod);
router.delete('/Admin/period/delete', periodController.DeletePeriod);


router.post('/Admin/class/create', classController.createclass);
router.get('/Admin/class/all', classController.getClass);
router.patch('/Admin/class/update', classController.UpdateClass);
router.delete('/Admin/class/delete', classController.DeleteClass);

router.get('/Admin/students/all', userController.GetAllUsers);
router.patch('/Admin/students/update', userController.UpdateUser);
router.delete('/Admin/students/delete', userController.DeleteStudent);

//User Routes
router.get('/verifySchool', userController.checkExistence);
router.route('/signup').post(parser.single('image'), userController.signup);
router.post('/login', userController.login);
router.get('/user', userController.getUser);
router.patch('/user/update', userController.UpdateUser);
router.patch('/user/register/course', userController.RegisterCourse);
router.route('/user/image').patch(parser.single('image'), userController.UpdateUserImage)
router.route('/user/v2/image').patch(parser.single('image'), userController.combinedUpdate)
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', user.resetPassword);
router.patch('/profile/resetPassword', user.resetPasswordwithOldPassword);
router.get('/user/getCourse/id', courseController.GetCourseById)
router.get('/user/getCourse/search', courseController.search);
router.get('/user/level/getCourse', courseController.GetCourseByLevel)
router.get('/user/getLecturer/id', LecturerController.getLecturerById)

// Discussion routes
router.post('/user/discussion', discussionController.createDiscussion);
router.get('/user/discussion/all', discussionController.getAllDiscussion);
router.get('/user/level/discussion', discussionController.getDiscussionByLevel);
router.patch('/user/discussion/update', discussionController.updateDiscussion);
router.put('/user/comment', discussionController.comment);
router.delete('/user/discussion/delete', discussionController.deleteDiscussion);

// EVENT
router.post('/user/event', eventController.createEvent);
router.get('/user/events', eventController.getUserEvents);
router.get('/user/events/day', eventController.getEventsByDate);
router.patch('/user/event/update', eventController.updateEvent);
router.delete('/user/events/delete', eventController.deleteEvent);

// Timetable
router.post('/timetable/new', timetable.sendTimetabledata);
router.get('/timetable', timetable.receivedata);


module.exports = router