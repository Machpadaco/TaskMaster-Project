const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = socketIO(server, { cors: { origin: "*" } });

connectDB();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/users', require('./routes/users'));
app.use('/api/chat', require('./routes/chat'));
app.use('/api/students', require('./routes/students'));
app.use('/api/phones', require('./routes/phones'));
app.use('/api/customers', require('./routes/customers'));

// Socket.IO - Real-time chat
io.on('connection', socket => {
  console.log('User connected:', socket.id);

  socket.on('chat message', msg => {
    io.emit('chat message', msg); // Broadcast to all
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 9000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
