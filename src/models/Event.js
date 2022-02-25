import mongoose from '../database';

const EventSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;
