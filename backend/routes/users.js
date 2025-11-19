const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload');
const User = require('../models/User');

router.post('/upload/:userId', upload.single('profilePic'), async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
      profilePic: req.file.path
    }, { new: true });

    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // ✅ This line was missing
