import { Schema, Document } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: {  
  salt: { type: String, required: true },
  hash: { type: String, required: true }
},
  roles: { type: [String], default: ['user'] },
});

export interface User extends Document {
  email: string;
  password: {
    salt: string;
    hash: string;
  };
  roles: string[];
}