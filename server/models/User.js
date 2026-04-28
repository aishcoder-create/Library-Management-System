const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'librarian', 'admin'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  refreshToken: { type: String }
});

module.exports = mongoose.model('User', UserSchema);
