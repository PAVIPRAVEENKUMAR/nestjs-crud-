import * as mongoose from 'mongoose';

export const ItemSchema = new mongoose.Schema({
  name: {type : String, require : true},
  qty: Number,
  description: String,
});