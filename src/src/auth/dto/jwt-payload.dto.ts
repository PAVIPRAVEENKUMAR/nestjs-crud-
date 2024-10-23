import { Exclude, Expose } from 'class-transformer';

export class JwtPayloadDto {
  @Expose()
  email: string;

  @Expose()  
  password: string;

  @Exclude()  
  role: string;

  constructor(partial: Partial<JwtPayloadDto>) {
    Object.assign(this, partial);
  }
}
