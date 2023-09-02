const mongoose = require('mongoose')

const Schema  = mongoose.Schema;

const postSchema = new Schema({
  word: {
    type: String,
    require: true,
  },
  transcription: {
    type: String,
    require: true,
  },
  translation: {
    type: String,
    require: true,
  },
}, {timestamps: true});


const Post = mongoose.model('Post', postSchema)

module.exports = Post;


// const mongoose = require('mongoose');

// const postSchema = new mongoose.Schema({
//   word: String,
//   transcription: String,
//   translation: String,
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now }
// });

// const Post = mongoose.model('Post', postSchema);

// module.exports = Post;