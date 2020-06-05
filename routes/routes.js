const express = require('express')
const router = express.Router()
const roomController = require('../controller/Room_controller');
const LecturerController = require('../controller/lecturer_controller');



//Admin Routes
router.post('/Admin/room', roomController.createRoom);
router.get('/Admin/room', roomController.GetAllRooms);
router.patch('/Admin/room/:id', roomController.updateRoom);
router.delete('/Admin/room/delete', roomController.DeleteRoom);

router.post('/api/Admin/lecturer', LecturerController.createLecturer);
router.get('/api/Admin/getlecturer', LecturerController.getAllLecturer);

//User Routes


module.exports = router