// const sql = require('../db.config');

// // constructor
// const Message = function(message) {
//   this.id = message.id;
//   this.sender_id = message.sender_id;
//   this.message_body = message.message_body;
//   this.created_at = message.created_at;
//   this.updated_at = message.updated_at;
//   this.deleted_at = message.deleted_at;
// };

// Message.create = (newMessage, result) => {
//   sql.query('INSERT INTO messages SET ?', newMessage, (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(err, null);
//       return;
//     }

//     console.log('created message: ', { id: res.insertId, ...newMessage });
//     result(null, { id: res.insertId, ...newMessage });
//   });
// };

// Message.findById = (id, result) => {
//   sql.query(`SELECT * FROM messages WHERE id = ${id}`, (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(err, null);
//       return;
//     }

//     if (res.length) {
//       console.log('found message: ', res[0]);
//       result(null, res[0]);
//       return;
//     }

//     // not found message with the id
//     result({ kind: 'not_found' }, null);
//   });
// };


// Message.getAll = result => {
//   sql.query('SELECT * FROM messages', (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     }

//     console.log('messages: ', res);
//     result(null, res);
//   });
// };

// Message.updateById = (id, message, result) => {
//   sql.query(
//     'UPDATE messages SET message_body = ? WHERE id = ?',
//     [message.message_body, id],
//     (err, res) => {
//       if (err) {
//         console.log('error: ', err);
//         result(null, err);
//         return;
//       }

//       if (res.affectedRows == 0) {
//         // not found User with the id
//         result({ kind: 'not_found' }, null);
//         return;
//       }

//       console.log('updated message: ', { id: id, ...message });
//       result(null, { id: id, ...message });
//     }
//   );
// };

// // Delete Message by Id
// Message.remove = (id, message, result) => {
//   sql.query('UPDATE messages SET deleted_at = ? WHERE id = ?',
//   [ message.deleted_at, id],
//   (err, res) => {
//     if (err) {
//       console.log('error: ', err);
//       result(null, err);
//       return;
//     }

//     if (res.affectedRows == 0) {
//       // not found Message with the id
//       result({ kind: 'not_found' }, null);
//       return;
//     }

//     console.log('deleted message with id: ', id);
//     result(null, res);
//   });
// };

// module.exports = Message;

const database = require('../db.config');

exports.getAll = async () => {
  const [results, fields] = await database.query(
    'SELECT * FROM messages WHERE deleted_at IS NULL'
  );
  return results;
};

exports.getById = async (id) => {
  const [results, fields] = await database.query(
    'SELECT * FROM messages WHERE id = ? AND deleted_at IS NULL',
    [id]
  );
  return results[0];
};

exports.add = async (message) => {
  const [results, fields] = await database.query(
    'INSERT INTO messages (user_id, message_body, created_at) VALUES (?, ?, ?)',
    [
      message.user_id,
      message.message_body,
      new Date(),
    ]
  );
  return results;
};

exports.update = async (id, message) => {
  const [results, fields] = await database.query(
    'UPDATE messages SET message_body = ?, updated_at = ? WHERE id = ? AND deleted_at IS NULL',
    [message.message_body, new Date(), id]
  );
  return results;
};

exports.delete = async (id) => {
  const [results, fields] = await database.query(
    'UPDATE messages SET deleted_at = ? WHERE id = ? AND deleted_at IS NULL',
    [new Date(), id]
  );
  return results;
};

