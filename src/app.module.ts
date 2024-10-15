import { Module } from '@nestjs/common';
import { ItemModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import config from './config/keys';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [UsersModule,ItemModule, MongooseModule.forRoot(config.mongo_URI, {retryAttempts: 5,retryDelay: 5000}), JwtModule.register({
    secret: 'yourSecretKey',
    signOptions: { expiresIn: '1h' },
  }),],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}