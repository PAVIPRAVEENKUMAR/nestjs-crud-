import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { scrypt as _scrypt, randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schema/user.schema';
import { promisify } from 'util';
import * as dotenv from 'dotenv';


dotenv.config();
const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET || 'defaultSecretKey';
  private readonly saltLength = 16; 
  
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService
  ) {}

  private async hashPassword(password: string): Promise<{ salt: string, hash: string }> {
    const salt = randomBytes(this.saltLength).toString('hex');
    const hash = (await scrypt(password, salt, 64)) as Buffer;
    return { salt, hash: hash.toString('hex') };
  }

  private async validatePassword(password: string, hash: string, salt: string): Promise<boolean> {
    const hashedPassword = (await scrypt(password, salt, 64)) as Buffer;
    return hashedPassword.toString('hex') === hash;
  }

  async register(email: string, password: string): Promise<User> {
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User already exists');
    }

    const { salt, hash } = await this.hashPassword(password);
    const newUser = new this.userModel({ email, password: { salt, hash }, });
    return newUser.save();
  }

  async login(email: string, password: string): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { salt, hash } = user.password; 
    const isPasswordValid = await this.validatePassword(password, hash, salt);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid password');
    }

    const payload = { email: user.email, sub: user._id, roles: user.roles };
    const token = this.jwtService.sign(payload, { secret: this.jwtSecret, expiresIn: '24h' });
    return { token };
  }

  async validateToken(token: string): Promise<any> {
    try {
      return this.jwtService.verify(token, { secret: this.jwtSecret });
    } catch (err) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async hasRole(user: any, requiredRoles: string[]): Promise<boolean> {
    return user.roles && requiredRoles.some(role => user.roles.includes(role));
  }
}