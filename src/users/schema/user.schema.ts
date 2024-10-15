import { Document, Schema } from 'mongoose';

export const UserSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  roles: { type: [String], default: ['user'] },
});

export interface User extends Document {
  email: string;
  password: string;
  roles: string[];
}