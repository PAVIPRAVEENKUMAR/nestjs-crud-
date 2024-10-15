import { Controller, Post, Body, Get, Headers, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('register')
  async register(@Body() body: { email: string, password: string }) {
    return this.authService.register(body.email, body.password);
  }

  
  @Post('login')
  async login(@Body() body: { email: string, password: string }) {
    return this.authService.login(body.email, body.password);
  }

  
  @Get('profile')
  async getProfile(@Headers('authorization') authHeader: string) {
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    const decodedToken = await this.authService.validateToken(token);
    return { message: 'Access granted to profile', user: decodedToken };
  }

  
  @Get('admin')
  async getAdmin(@Headers('authorization') authHeader: string) {
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    const decodedToken = await this.authService.validateToken(token);

    const hasAdminRole = await this.authService.hasRole(decodedToken, ['admin']);
    if (!hasAdminRole) {
      throw new UnauthorizedException('Access denied. Admin role required');
    }

    return { message: 'Access granted to admin area' };
  }
}