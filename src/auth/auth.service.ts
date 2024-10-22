import { Injectable, UnauthorizedException,Inject, forwardRef, BadRequestException, InternalServerErrorException, NotFoundException} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UsersService } from '../users/users.service';
import { randomBytes, scrypt as _scrypt } from 'crypto';
import { promisify } from 'util';
import { sign } from 'jsonwebtoken';
import { JwtPayload } from './jwt.payload';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

const scrypt = promisify(_scrypt);

@Injectable()
export class AuthService {
  private readonly jwtSecret = process.env.JWT_SECRET;

  constructor(
    @Inject(forwardRef(() => UsersService))
    private usersService: UsersService) 
    {}
    async login(email: string, password: string) {
      password = decodeURI(password);
      const user = await this.usersService.findUserByEmail(email);
      if (!user) {
        throw new NotFoundException('User not found');
      }
      const [salt, storedhash] = user.password.split('.');
      const hash = (await scrypt(password, salt, 32)) as Buffer;
      if (storedhash !== hash.toString('hex')) {
        throw new BadRequestException('bad password');
      }
      const JwtPayload: JwtPayloadDto = {
        email: user.email,
        password: user.password,
        role: user.role,
      };
      return sign(JwtPayload, process.env.JWT_SECRET, { expiresIn: '24h' });
    }
  async validateToken(token: string): Promise<JwtPayloadDto | null> {
    try {
      const decodedToken = jwt.verify(token, this.jwtSecret) as JwtPayload;
      const serializedPayload = new JwtPayloadDto(decodedToken);
      return serializedPayload;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async hashPassword(password: string) {
    password = decodeURI(password);
    const salt = randomBytes(8).toString('hex');
    const hash = (await scrypt(password, salt, 32)) as Buffer;
    const result = salt + '.' + hash.toString('hex');
    return result;
  }
  async hasRole(decodedToken: any, roles: string[]): Promise<boolean> {
    return roles.includes(decodedToken.role);
  }
}