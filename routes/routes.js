const express = require('express')
const router = express.Router()
const roomController = require('../controller/Room_controller');
const LecturerController = require('../controller/lecturer_controller');
const courseController = require('../controller/course_controller');
const periodController = require('../controller/period_controller');
const userController = require('../controller/user');
const discussionController = require('../controller/discussion_controller');
const user = require('../controller/user');
const Lecturer = require('../models/lecturer');
const { parser } = require('../middleware/upload');



router.get('/', (req, res) => {
    res.send("welcome to home page");
})

//Admin Routes
router.post('/Admin/room', roomController.createRoom);
router.get('/Admin/room', roomController.GetAllRooms);
router.patch('/Admin/room/:id', roomController.updateRoom);
router.delete('/Admin/room/delete', roomController.DeleteRoom);

router.post('/Admin/lecturer', LecturerController.createLecturer);
router.get('/Admin/getlecturer', LecturerController.getAllLecturer);
router.patch('/Admin/lecturer/update', LecturerController.UpdateLecturer);
router.delete('/Admin/lecturer/delete', LecturerController.Deletelecturer);
router.route('/image').patch(parser.single('image'), LecturerController.UploadImage);


router.post('/Admin/course', courseController.createCourse);
router.get('/Admin/getCourse', courseController.GetAllCourses);
router.patch('/Admin/course/update', courseController.UpdateCourse);
router.delete('/Admin/course/delete', courseController.DeleteCourse);

router.post('/Admin/period', periodController.createPeriod);
router.get('/Admin/getPeriod', periodController.getAllPeriods);
//router.patch('/Admin/period/update', periodController)
router.delete('/Admin/period/delete', periodController.DeletePeriod);


//User Routes
router.post('/verifySchool', userController.checkExistence);
router.post('/signup', userController.signup);
router.post('/login', userController.login);
router.get('/user', userController.getUser);
router.patch('/user/update', userController.UpdateUser);
router.patch('/user/register/course', userController.RegisterCourse);
router.route('/user/image').patch(parser.single('image'), userController.UpdateUserImage)
router.post('/forgotPassword', userController.forgotPassword);
router.post('/resetPassword', user.resetPassword);
router.get('/user/getCourse/id', courseController.GetCourseById)
router.get('/user/getCourse/search', courseController.search);
router.get('/user/level/getCourse', courseController.GetCourseByLevel)
router.get('/user/getLecturer/id', LecturerController.getLecturerById)
router.post('/user/discussion', discussionController.createDiscussion);
router.put('/user/comment', discussionController.comment);


module.exports = router