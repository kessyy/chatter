// module.exports = app => {
//   const messages = require('../controllers/message.controller.js');

//   // Create a message
//   app.post('/messages', messages.create);

//   // Retrieve all messages
//   app.get('/messages', messages.findAll);

//   // Retrieve a single message with Id
//   app.get('/messages/:id', messages.findOne);

//   // Update a message with Id
//   app.put('/messages/:id', messages.update);

//   // Delete a message with messageId
//   app.delete('/messages/:id', messages.delete);

// };

// const express = require('express');
// const messageRouter = express.Router();
// const messages = require('../controllers/message.controller.js');

//   // Create a message
//   messageRouter.post('/messages', messages.create);

//   // Retrieve all messages
//   messageRouter.get('/messages', messages.findAll);

//   // Retrieve a single message with Id
//   messageRouter.get('/messages/:id', messages.findOne);

//   // Update a message with Id
//   messageRouter.put('/messages/:id', messages.update);

//   // Delete a message with messageId
//   messageRouter.delete('/messages/:id', messages.delete);

//   module.exports = messageRouter;

const express = require('express');
const messageRouter = express.Router();
const messages = require('../controllers/message.controller');

// Get all messages
messageRouter.get('/message-details', messages.getMessages);

// Get a single message
messageRouter.get('/:id', messages.getMessageById);

// send new message
messageRouter.post('/send', messages.addMessage);

// Update a message
messageRouter.put('/:id', messages.updateMessage);

// Soft delete a message
messageRouter.delete('/:id', messages.deleteMessage);

module.exports = messageRouter;
