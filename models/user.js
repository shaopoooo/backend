const { Schema } = require('mongoose');

module.exports = new Schema({
  factory: {
    type: Schema.Types.ObjectId,
    ref: 'factory',
  },
  name: String,
  email: String,
  tel: String,
  username: String,
  password: String,
  level: String,
  status: String,
  super: {
    type: Schema.Types.ObjectId,
  },
  cTime: {
    type: Date,
    default: Date.now,
  },
  uTime: {
    type: Date,
    default: Date.now,
  },
  thrid_party: { type: Object, default: {} },
});
