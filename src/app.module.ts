import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ItemModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/keys';

@Module({
  imports: [ItemModule, MongooseModule.forRoot(config.mongo_URI)],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}