import { Exclude, Expose } from 'class-transformer';

export class UserProfileDto {
  @Expose()  
  email: string;
  
  @Exclude()  
  password: string;

  @Expose()  
  role: string;

  constructor(partial: Partial<UserProfileDto>) {
    Object.assign(this, partial);
  }
}