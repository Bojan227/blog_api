const mongoose = require('mongoose');
const { Schema } = mongoose;

const CommentsSchema = new Schema(
  {
    username: { type: String, required: true },
    desc: { type: String, required: true },
    post: { type: Schema.Types.ObjectId, ref: 'Post' },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Comment', CommentsSchema);