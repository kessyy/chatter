const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const port = process.env.PORT || 3000;
const jwt = require('jsonwebtoken');
const secretKey = 'mynotsosecretkey';
const userRouter = require('./routes/user.route');
const messageRouter = require('./routes/message.route');
const roomRouter = require('./routes/room.route');
const winston = require('winston');
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    //
    // - Write to all logs with level `info` and below to `combined.log` 
    // - Write all logs error (and below) to `error.log`.
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});
// logger.info('This is an info message');
// logger.warn('This is a warning message');
app.use(cors());
app.use(bodyParser.json());
app.use('/users', userRouter);
app.use('/messages', messageRouter);
app.use('/rooms', roomRouter);

app.get('/', (req, res, next) => {
  console.log('connected to applicatiuon');
  res.send('Connected to application');
  next();
});

io.on('connection', socket => {
  console.log('user connected');

  // Handles the user joining process
  socket.on('join', data => {
    socket.join(data.room);
    socket.in(data.room)
      .emit(
        'user-joined',
        {
          user: data.user,
          message: 'has joined',
          image: 'assets/images/avatar.png',
          time: new Date().getHours() + ':' + new Date().getMinutes()
        });
  });

  // Handles the user leaving process
  socket.on('leave', data => {
    socket.leave(data.room, err => {
      socket.in(data.room)
        .emit(
          'user-left',
          {
            user: data.user,
            message: 'has left',
            image: 'assets/images/avatar.png',
            time: new Date().getHours() + ':' + new Date().getMinutes()
          });
    });
  });

  // Handles the user message process
  socket.on('message', data => {
    io.in(data.room).emit(
      'new-message',
      {
        user: data.user,
        message: data.message,
        image: 'assets/images/avatar.png',
        time: new Date().getHours() + ':' + new Date().getMinutes()
      });
  });
});

http.listen(port, () => {
  console.log(`started on port: ${port}`);
});