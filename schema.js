const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  commentedAt: {
    type: Date,
    default: Date.now,
  },
});

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    unique: true,
    minlength: 5,
  },
  content: {
    type: String,
    required: true,
    minlength: 50,
  },
  author: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    default: [],
  },
  category: {
    type: String,
    default: 'General',
  },
  likes: {
    type: [String],
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  comments: [commentSchema],
});

// Pre-save middleware to update 'updatedAt'
postSchema.pre('save', function (next) {
  this.updatedAt = Date.now();
  next();
});

const Post = mongoose.model('Post', postSchema);

module.exports = { Post };