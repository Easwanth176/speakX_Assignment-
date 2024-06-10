const mongoose = require('mongoose');

const tweetSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  retweets: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Tweet = mongoose.model('Tweet', tweetSchema);
module.exports = Tweet;
