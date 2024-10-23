import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsService } from './items.service';
import { ItemSchema } from './schema/items.schema';
import { ItemsController } from './items.controller';
import { AuthService } from 'src/auth/auth.service';
import { UsersModule } from 'src/users/users.module';
import { JwtModule } from '@nestjs/jwt';


@Module({
  imports: [UsersModule,MongooseModule.forFeature([{ name: 'Item', schema: ItemSchema }]),JwtModule.register({
    secret: 'yourJwtSecretKey', 
    signOptions: { expiresIn: '24hr' }, 
  })],
  controllers: [ItemsController],
  providers: [ItemsService,AuthService,UsersModule],
})
export class ItemModule {}