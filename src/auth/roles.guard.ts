import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthService } from './auth.service';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    if (!roles) {
      return true; 
    }

    const request = context.switchToHttp().getRequest();
    const user = request['user'];  
    const hasRole = await this.authService.hasRole(user, roles);
    if (!hasRole) {
      throw new ForbiddenException('Access denied');
    }

    return true;
  }
}