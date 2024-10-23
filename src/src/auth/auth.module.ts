import { Module, forwardRef, NestModule, MiddlewareConsumer, RequestMethod, UnauthorizedException} from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { RolesGuard } from './roles.guard';
import { UsersModule } from '../users/users.module'; 
import { Request, Response, NextFunction } from 'express';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [],
  providers: [AuthService, JwtAuthGuard, JwtStrategy, RolesGuard],
  exports: [AuthService, JwtAuthGuard,JwtModule],
})
export class AuthModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply((req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        if (!authHeader) {
          throw new UnauthorizedException('Authorization header is missing');
        }
        if (!authHeader.startsWith('Bearer ')) {
          throw new UnauthorizedException('Invalid Authorization format');
        }
        next();
      })
      .forRoutes({ path: 'profile',method: RequestMethod.ALL},{path:'admin', method: RequestMethod.ALL });
  }
}