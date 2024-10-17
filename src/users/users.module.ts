import { Module,forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { User, UserSchema } from './users.schema';
import { AuthModule } from '../auth/auth.module';
import { UsersController } from './users.controller'; 

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    forwardRef(() =>AuthModule)
  ],
  controllers: [UsersController],
  providers: [UsersService], 
  exports: [UsersService],  
})
export class UsersModule {}