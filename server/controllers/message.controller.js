// const Message = require('../models/messages.model.js');

// // Create and Save a new Message
// exports.create = (req, res) => {
//   // Validate request
//   if (!req.body) {
//     res.status(400).send({
//       message: 'Content can not be empty!'
//     });
//   }

//   // Create a Message
//   const message = new Message({
//     id: req.body.id,
//     sender_id: req.body.sender_id,
//     message_body: req.body.message_body,
//     created_at: req.body.created_at,
//     updated_at: req.body.updated_at,
//     deleted_at: req.body.deleted_at,
//   });

//   // Save Message in the database
//   Message.create(message, (err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while creating the Message."
//       });
//     else res.send(data);
//   });
// };

// // Retrieve all Messages from the database.
// exports.findAll = (req, res) => {
//   Message.getAll((err, data) => {
//     if (err)
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while retrieving messages.'
//       });
//     else res.send(data);
//   });
// };

// // Find a single message with a Id
// exports.findOne = (req, res) => {
//   Message.findById(req.params.id, (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         res.status(404).send({
//           message: `Not found message with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: 'Error retrieving message with id ' + req.params.id
//         });
//       }
//     } else res.send(data);
//   });
// };

// // Update a Message identified by the Id in the request
// exports.update = (req, res) => {
//   // Validate Request
//   if (!req.body) {
//     res.status(400).send({
//       message: 'Content can not be empty!'
//     });
//   }

//   Message.updateById(
//     req.params.id,
//     new Message(req.body),
//     (err, data) => {
//       if (err) {
//         if (err.kind === 'not_found') {
//           res.status(404).send({
//             message: `Not found message with id ${req.params.id}.`
//           });
//         } else {
//           res.status(500).send({
//             message: 'Error updating message with id ' + req.params.id
//           });
//         }
//       } else res.send(data);
//     }
//   );
// };

// // Delete a message with the specified Id in the request
// exports.delete = (req, res) => {
//  // Validate Request
//  if (!req.body) {
//   res.status(400).send({
//     message: 'Content can not be empty!'
//   });
// }

// Message.remove(
//   req.params.id,
//   new Message(req.body),
//   (err, data) => {
//     if (err) {
//       if (err.kind === 'not_found') {
//         res.status(404).send({
//           message: `Not found message with id ${req.params.id}.`
//         });
//       } else {
//         res.status(500).send({
//           message: 'Error updating message with id ' + req.params.id
//         });
//       }
//     } else res.send(data);
//   }
// );
// };

const Message = require('../models/messages.model');

exports.getMessages = async (req, res) => {
  try {
    const messages = await Message.getAll();
    res.json(messages);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.getMessageById = async (req, res) => {
  try {
    const message = await Message.getById(req.params.id);
    if (message) {
      res.json(message);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

// exports.addMessage = async (req, res) => {
//   try {
//     await Message.add(req.body);
//     res.sendStatus(201);
//   } catch (error) {
//     console.log(error);
//     res.sendStatus(500);
//   }
// };

exports.addMessage = async (req, res) => {
  try {
    const addedMessage = await Message.add(req.body);
    res.status(201).json({ addedMessage });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const result = await Message.update(req.params.id, req.body);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

exports.deleteMessage = async (req, res) => {
  try {
    const result = await Message.delete(req.params.id);
    if (result.affectedRows > 0) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
};

