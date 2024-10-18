import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true })  
  email: string;

  @Prop({ required: false })
  password: string;

  @Prop({ required: false })
  salt: string; 

  @Prop({ default: 'user' })  
  role: string;

}
export const UserSchema = SchemaFactory.createForClass(User);