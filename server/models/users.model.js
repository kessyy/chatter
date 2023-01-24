const database = require('../db.config');
const Room = require('./rooms.model');


exports.getAll = async () => {
  const [results, fields] = await database.query(
    'SELECT * FROM users WHERE deleted_at IS NULL'
  );
  return results;
};

exports.getById = async (id) => {
  const [results, fields] = await database.query(
    'SELECT * FROM users WHERE id = ? AND deleted_at IS NULL',
    [id]
  );

  // // Get the room associated with the user user
  // const room = await Room.getById(results[0].room_id);
  // results[0].room = room;
  return results[0];
};



exports.add = async (user) => {
  const [results, fields] = await database.query(
    'INSERT INTO users (first_name, last_name, alias_name, email, telephone, bio, password, created_at, is_active, terms, avatar, role) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [
      user.first_name,
      user.last_name,
      user.alias_name,
      user.email,
      user.telephone,
      user.bio,
      user.password,
      new Date(),
      user.is_active,
      user.terms,
      user.avatar,
      user.role,
    ]
  );
  
  // Create a new room
  const newRoom = await Room.createRoom({
    room_name: `${user.first_name} ${user.last_name} room`,
    created_at: new Date()
  });
    
  // Assign the created room's id to the user
  await database.query(
    'UPDATE users SET room_id = ? WHERE id = ?',
    [newRoom, results.insertId]
  );
  console.log('room id', newRoom )
    
  return results;
};

exports.login = async (credentials) => {
  const [results, fields] = await database.query(
    'SELECT * FROM users WHERE email = ? AND password = ?',
    [credentials.email, credentials.password]
  );
  return results[0];
};


exports.update = async (id, user) => {
  const [results, fields] = await database.query(
    'UPDATE users SET first_name = ?, last_name = ?, alias_name = ?, email = ?, bio = ?, updated_at = ? WHERE id = ? AND deleted_at IS NULL',
    [user.first_name, user.last_name, user.alias_name, user.email, user.bio, new Date(), id]
  );
    
  //Update the room associated with the user
  if(user.room_id) {
    await Room.update(user.room_id, { room_name: `${user.first_name} ${user.last_name} room` });
  }
    
  return results;
};
    


exports.delete = async (id) => {
  const [results, fields] = await database.query(
    'UPDATE users SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL',
    [new Date(), id]
  );
  return results;
};
