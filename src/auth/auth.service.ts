import { Injectable, UnauthorizedException,Inject, forwardRef} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import * as crypto from 'crypto';
import { JwtPayload } from './jwt.payload';

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;
  private readonly saltLength = 16;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService) 
    {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findUserByEmail(email);
    if (user && await this.validatePassword(password, user.password, user.salt)) {
      const { password, ...result } = user;
      return result; 
    }
    throw new UnauthorizedException('Invalid credentials');
  }

  async login(user: any): Promise<{ access_token: string }> {
    const payload: JwtPayload = { email: user.email, sub: user._id, role: user.role };
    const token = jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
    return { access_token: token }; 
  }

  async validateToken(token: string): Promise<JwtPayload | null> {
    try {
      return jwt.verify(token, this.jwtSecret) as JwtPayload; 
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
  async hashPassword(password: string): Promise<{ salt: string, hash: string }> {
    const salt = crypto.randomBytes(this.saltLength).toString('hex');
    const hash = await new Promise<string>((resolve, reject) => {
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
    return { salt, hash };  
  }
  async hasRole(decodedToken: any, roles: string[]): Promise<boolean> {
    return roles.includes(decodedToken.role);
  }
  private async validatePassword(password: string, hash: string, salt: string): Promise<boolean> {
    const hashedPassword = await new Promise<string>((resolve, reject) => {
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err);
        resolve(derivedKey.toString('hex'));
      });
    });
    return hashedPassword === hash;
  }
}