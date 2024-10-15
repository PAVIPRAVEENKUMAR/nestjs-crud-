import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';  
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schema/user.schema'; 

@Injectable()
export class AuthService {
  private readonly jwtSecret = 'yourSecretKey';
  private readonly saltRounds = 10;  

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {
    console.log('UserModel:', this.userModel);
  }

  
  async hashPassword(password: string): Promise<string> {
        const hash = await bcrypt.hash(password, this.saltRounds);
    return hash;
  }

  
  async validatePassword(password: string, hash: string): Promise<boolean> {
    
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }

  
  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    const hash = await this.hashPassword(password);
    const newUser = new this.userModel({ email, password: hash });
    return newUser.save();
  }

  
  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await this.validatePassword(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email, sub: user._id, roles: user.roles };
    const token = this.jwtService.sign(payload, { secret: this.jwtSecret, expiresIn: '1h' });
    return { token };
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, { secret: this.jwtSecret });
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }
  
  async hasRole(user: any, requiredRole: string[]): Promise<boolean> {
    const { roles } = user;
    return roles && roles.includes(requiredRole);
  }
}