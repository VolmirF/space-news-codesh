import mongoose from '../database';

const LaunchSchema = new mongoose.Schema({
  provider: {
    type: String,
    required: true,
  },
});

const Launch = mongoose.model('Launch', LaunchSchema);

module.exports = Launch;
