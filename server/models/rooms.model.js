const database = require('../db.config');

const getAllRooms = async () => {
    try {
        const result = await database.query(`SELECT * FROM rooms WHERE deleted_at IS NULL`);
        return result;
    } catch (error) {
        throw error;
    }
};

const getRoomById = async (id) => {
    try {
        const result = await database.query(`SELECT * FROM rooms WHERE id = ${id} AND deleted_at IS NULL`);
        return result;
    } catch (error) {
        throw error;
    }
};

const createRoom = async (user) => {
  try {
    const room_name = user.room_name;
    const [result] = await database.query(`INSERT INTO rooms (room_name, created_at) VALUES ( '${room_name}', NOW() )`);
    return result.insertId;
        // return result;
  } catch (error) {
    throw error;
  }
};

const updateRoom = async (id, data) => {
  console.log('updated room')
  try {
  const { room_name } = data;
  const result = await database.query(`UPDATE rooms SET room_name = '${room_name}', updated_at = NOW() WHERE id = ${id}`);
  return result;
  } catch (error) {
  throw error;
  }
};

const addUserToRoom = async (id, data) => {
  try {
    const { users } = data
    const result = await database.query(`UPDATE rooms SET users = concat(users, ',${users}'), updated_at = NOW() WHERE id = ${id}`);
    return result;
  } catch (error) {
    throw new Error(`Error adding user to room: ${error}`);
  }
}

// const addUserToRoom = async (id, data) => {
//   try {
//     const { users } = data;
//     const checkUser = await database.query(`SELECT users FROM rooms WHERE id = ${id}`);
//     if(!checkUser[0].users.includes(users)){
//     const result = await database.query(`UPDATE rooms SET users = concat(users, ',${users}'), updated_at = NOW() WHERE id = ${id}`);
//     return result;
//     } else {
//     throw new Error(`Error adding user to room: ${error}`);
//     }
//   } catch (error) {
//     throw new Error(`Error adding user to room: ${error}`);
//   }
// }


const addMessageToRoom = async (id, data) => {
  console.log('adding message')
  try {
    const { messages } = data
    const result = await database.query(`UPDATE rooms SET messages = concat(messages, ',${messages}'), updated_at = NOW() WHERE id = ${id}`);
    return result;
  } catch (error) {
    throw new Error(`Error adding message to room: ${error}`);
  }
}

const softDeleteRoom = async (id) => {
    try {
        const result = await database.query(`UPDATE rooms SET deleted_at = NOW() WHERE id = ${id}`);
        return result;
    } catch (error) {
        throw error;
    }
};

module.exports = {
  getAllRooms,
  getRoomById,
  createRoom,
  updateRoom,
  addUserToRoom,
  addMessageToRoom,
  softDeleteRoom
};