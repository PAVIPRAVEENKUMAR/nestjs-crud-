import {Schema} from 'mongoose';

export const ItemSchema = new Schema({
  name: {type : String, require : true},
  qty: Number,
  description: String,
});