import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Exclude, Expose } from 'class-transformer';
@Schema()
export class User extends Document {
  @Expose()
  @Prop({ required: true, unique: true })  
  email: string;

  @Exclude()
  @Prop({ required: false })
  password: string; 

  @Expose()
  @Prop({ default: 'user' })  
  role: string;

}
export const UserSchema = SchemaFactory.createForClass(User);