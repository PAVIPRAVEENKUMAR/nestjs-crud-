import { Module } from '@nestjs/common';
import { ItemModule } from './items/items.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
  imports: [UsersModule,ItemModule,ConfigModule.forRoot({
    isGlobal: true,
  }),MongooseModule.forRootAsync({imports: [ConfigModule],
    inject: [ConfigService],
    useFactory: (configService: ConfigService) => ({
      uri: configService.get<string>('MONGO_URI'), 
    }),
  }), JwtModule.register({
    secret: 'yourSecretKey',
    signOptions: { expiresIn: '1h' },
  })],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}