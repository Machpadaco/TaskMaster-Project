const express = require('express');
const router = express.Router();
const Phone = require('../models/Phone');

router.post('/', async (req, res) => {
  try {
    const phone = new Phone(req.body);
    await phone.save();
    res.status(201).json(phone);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const phones = await Phone.find();
    res.json(phones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
