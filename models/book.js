import mongoose from 'mongoose';

const schema = mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  genre: {
    type: String
  },
  read: {
    type: Boolean,
    default: false
  }
});

export default mongoose.model('Book', schema);