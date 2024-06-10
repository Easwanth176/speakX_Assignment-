const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tweet: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
