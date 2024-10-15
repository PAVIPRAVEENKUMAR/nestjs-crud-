import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header missing');
    }
    const token = authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    const decodedToken = await this.authService.validateToken(token);
    if (!decodedToken) {
      throw new UnauthorizedException('Invalid or expired token');
    }
    request['user'] = decodedToken;  

    return true;
  }
}