const express = require('express');
const router = express.Router();
const Message = require('../models/Message');

router.post('/', async (req, res) => {
  try {
    const message = new Message(req.body);
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await Message.find({ parentId: null }).populate('userId');
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:parentId/replies', async (req, res) => {
  try {
    const replies = await Message.find({ parentId: req.params.parentId }).populate('userId');
    res.json(replies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
