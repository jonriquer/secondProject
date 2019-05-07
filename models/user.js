const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const userSchema = new Schema({
  username: String,
  password: String,
  myStocks: [{type: Schema.Types.ObjectId}]
}, {
  timestamps: true
});

const User = mongoose.model("User", userSchema);

module.exports = User;