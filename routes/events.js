const express = require('express');
const mongoose = require('mongoose');
const Event = require('../models/event');

const router = express.Router();

// GET all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch {
    res.status(500).json({ message: 'Server error fetching events' });
  }
});

// GET schedule (all events)
router.get('/schedule/all', async (req, res) => {
  try {
    const events = await Event.find();
    res.json(events);
  } catch {
    res.status(500).json({ error: 'Failed to fetch schedule' });
  }
});

// GET schedule (specific fields)
router.get('/schedule', async (req, res) => {
  try {
    const events = await Event.find({}, 'day title dateTime venue').sort({ day: 1, dateTime: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

// GET event by ID (keep this last)
router.get('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    if (!mongoose.Types.ObjectId.isValid(eventId)) return res.status(400).json({ message: 'Invalid Event ID format' });
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    res.json(event);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;