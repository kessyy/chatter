const {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  addUserToRoom,
  addMessageToRoom,
  softDeleteRoom
} = require('../models/rooms.model');

exports.getAllRooms = async (req, res) => {
  try {
      const rooms = await getAllRooms();
      res.status(200).json({ rooms });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.getRoomById = async (req, res) => {
  try {
      const { id } = req.params;
      const room = await getRoomById(id);
      res.status(200).json({ room });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.createNewRoom = async (req, res) => {
  try {
      const { first_name, last_name } = req.body;
      const newRoom = await createRoom({ first_name, last_name });
      res.status(201).json({ newRoom });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.updateRoom = async (req, res) => {
  try {
      const { id } = req.params;
      const { room_name } = req.body;
      const updatedRoom = await updateRoom(id, { room_name });
      res.status(200).json({ updatedRoom });
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};

exports.addUserToRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { users }  = req.body;
    const addedUser = await addUserToRoom(id,  {users});
    res.status(200).json({ addedUser });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

exports.addMessageToRoom = async (req, res) => {
  try {
    const { id } = req.params;
    const { messages }  = req.body;
    const addedMessage = await addMessageToRoom(id,  {messages});
    res.status(200).json({ addedMessage });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

exports.softDeleteRoom = async (req, res) => {
  try {
      const { id } = req.params;
      const deletedRoom = await softDeleteRoom(id);
      res.status(200).json({deletedRoom});
  } catch (error) {
      res.status(500).json({ error: error.message });
  }
};
