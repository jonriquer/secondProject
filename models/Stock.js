const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const stockSchema = new Schema({
  user: { type : Schema.Types.ObjectId, ref: 'User' },
  ticker: String,
  price: Number,
  marketCap: Number,
  peRatio: Number
} 
  // {
  //   timestamps: true
  // }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;