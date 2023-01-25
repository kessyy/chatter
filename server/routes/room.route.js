const express = require('express');
const router = express.Router();
const rooms = require('../controllers/room.controller');

//  create room
router.post('/', rooms.createNewRoom);

// get all rooms
router.get('/all-rooms', rooms.getAllRooms);

// get single room
router.get('/:id', rooms.getRoomById);

// update single room
router.put('/:id', rooms.updateRoom);

// update users in room
router.put('/add-user/:id', rooms.addUserToRoom);

// update messages in room
router.put('/add-message/:id', rooms.addMessageToRoom)

// delete room
router.delete('/:id', rooms.softDeleteRoom);

module.exports = router;
