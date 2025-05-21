const express = require('express');
const bcrypt = require('bcryptjs');
const Admin = require('../models/admin');

const router = express.Router();

function isAdmin(req, res, next) {
  if (req.session && req.session.adminId) return next();
  res.status(401).json({ message: 'Unauthorized' });
}

router.post('/signup', async (req, res) => {
  const { username, password, signupCode } = req.body;
  if (!username || !password || !signupCode) return res.status(400).json({ message: 'Missing fields' });
  if (signupCode !== process.env.ADMIN_SIGNUP_CODE) return res.status(403).json({ message: 'Invalid signup code' });
  try {
    const hash = await bcrypt.hash(password, 10);
    const admin = new Admin({ username, password: hash });
    await admin.save();
    res.json({ message: 'Admin created' });
  } catch {
    res.status(400).json({ message: 'Username taken or error' });
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(401).json({ message: 'Invalid credentials' });
  const match = await bcrypt.compare(password, admin.password);
  if (!match) return res.status(401).json({ message: 'Invalid credentials' });
  req.session.adminId = admin._id;
  res.json({ message: 'Logged in' });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.clearCookie('connect.sid', { path: '/' });
    res.json({ message: 'Logged out' });
  });
});

router.get('/status', (req, res) => {
  res.json({ isAdmin: !!req.session.adminId });
});

// Event update/delete (admin only)
const Event = require('../models/event');

router.put('/events/:id', isAdmin, async (req, res) => {
  try {
    const updatedEvent = await Event.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedEvent) return res.status(404).json({ message: 'Event not found' });
    res.json(updatedEvent);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

router.delete('/events/:id', isAdmin, async (req, res) => {
  try {
    const deletedEvent = await Event.findByIdAndDelete(req.params.id);
    if (!deletedEvent) return res.status(404).json({ message: 'Event not found' });
    res.sendStatus(204);
  } catch {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;