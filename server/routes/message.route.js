const express = require('express');
const messageRouter = express.Router();
const messages = require('../controllers/message.controller');

// Get all messages
messageRouter.get('/message-details', messages.getMessages);

// Get a single message
messageRouter.get('/:id', messages.getMessageById);

// send new message
messageRouter.post('/send-message', messages.addMessage);

// Update a message
messageRouter.put('/:id', messages.updateMessage);

// Soft delete a message
messageRouter.delete('/:id', messages.deleteMessage);

module.exports = messageRouter;
