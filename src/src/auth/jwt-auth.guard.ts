import { Injectable, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { AuthGuard } from '@nestjs/passport'
import {IS_PUBLIC_KEY} from 'src/others/decortors/custom.decorator';
import { Reflector } from '@nestjs/core';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY,[
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('Is Public Route:', isPublic);
    if (isPublic) {
      return true; 
    }
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromRequest(request);
    console.log('Extracted Token:', token);

    if (!token) {
      throw new UnauthorizedException('No token found');
    }

    try {
      const decoded = jwt.verify(token, 'your-secret-key');
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  private extractTokenFromRequest(request: any): string | null {
    const authHeader = request.headers.authorization;
    if (!authHeader) return null;
    const [bearer, token] = authHeader.split(' ');
    return bearer === 'Bearer' && token ? token : null;
  }
}