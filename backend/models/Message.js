const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  content: String,
  videoUrl: String,
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'Message', default: null }, // For threaded replies
  reactions: [{ userId: String, emoji: String }]
}, { timestamps: true });

module.exports = mongoose.model('Message', MessageSchema);
