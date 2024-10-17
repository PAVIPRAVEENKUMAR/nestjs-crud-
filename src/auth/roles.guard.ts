import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!requiredRoles) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const user: JwtPayload = request.user;

    if (!requiredRoles.includes(user.role)) {
      throw new ForbiddenException(`Access denied: Requires role ${requiredRoles.join(' or ')}`);
    }

    return true;
  }
}