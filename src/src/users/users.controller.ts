import { Controller, Post, Body, Get, Headers, UnauthorizedException, BadRequestException, ConflictException, ForbiddenException, UseInterceptors, InternalServerErrorException } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import {CreateUserDto} from './dto/createuser.dto';
import {UsersService} from './users.service';
import { UserloginDto } from './dto/userlogin.dto';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { AllowRoles } from '../others/decortors/allowRoles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';
import { Public } from 'src/others/decortors/custom.decorator';

@Controller('users')
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly authService: AuthService,
              private readonly usersService: UsersService
) {}

  @Post('register')
  @Public()
async register(@Body() body: CreateUserDto) {
  if (!body.email || !body.password) {
    throw new BadRequestException('Email and password are required');
  }
  const existingUser = await this.usersService.findUserByEmail(body.email);
  if (existingUser) {
    throw new ConflictException('Email already in use');
  }
  return this.usersService.createUser(body.email, body.password, 'user');
}
  @Post('login')
  @Public()
async login(@Body() body: UserloginDto) {
  if (!body.email || !body.password) {
    throw new BadRequestException('Email and password are required');
  }
 return this.authService.login(body.email,body.password);
}catch (error) {
    throw new InternalServerErrorException('Login failed');
  }
  
@Get('profile')
@AllowRoles('Profile')
@UseInterceptors(ClassSerializerInterceptor)
async getProfile(@Headers('authorization') authHeader: string) {
  if (!authHeader) {
    throw new BadRequestException('Authorization header is missing');
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new UnauthorizedException('Token is required');
  }
  const decodedToken = await this.authService.validateToken(token);
  if (!decodedToken) {
    throw new UnauthorizedException('Invalid or expired token'); 
    }
  return { message: 'Access granted to profile', user: decodedToken };
}
  
@Get('admin')
@AllowRoles('admin')
async getAdmin(@Headers('authorization') authHeader: string) {
  if (!authHeader) {
    throw new BadRequestException('Authorization header is missing');
  }
  const token = authHeader.split(' ')[1];
  if (!token) {
    throw new UnauthorizedException('Token is required'); 
}
  const decodedToken = await this.authService.validateToken(token);
  if (!decodedToken) {
    throw new UnauthorizedException('Invalid or expired token');
    }
    const hasAdminRole = await this.authService.hasRole(decodedToken, ['admin']);
  if(!hasAdminRole) {
    throw new ForbiddenException('Access denied. Admin role required'); 
  }
  return { message: 'Access granted to admin area'};
}
}