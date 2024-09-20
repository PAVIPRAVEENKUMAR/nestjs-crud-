import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import config from './config/keys';

@Module({
  imports: [ItemModule, MongooseModule.forRoot(config.mongo_URI, {retryAttempts: 5,retryDelay: 5000}), UsersModule, AuthModule],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}