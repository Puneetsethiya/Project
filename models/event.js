const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventId: Number,
  day: String,
  title: String,
  subtitle: String,
  registration: Number,
  prize: String,
  participants: String,
  timeLimit: String,
  topic: String,
  rules: [String],
  dateTime: String,
  venue: String,
  coordinators: [String]
});

module.exports = mongoose.models.Event || mongoose.model('Event', eventSchema);
