import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schema/user.schema';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    private readonly jwtSecret;
    private readonly saltRounds;
    constructor(userModel: Model<User>, jwtService: JwtService);
    hashPassword(password: string): Promise<string>;
    validatePassword(password: string, hash: string): Promise<boolean>;
    register(email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    validateToken(token: string): Promise<any>;
    hasRole(user: any, requiredRole: string[]): Promise<boolean>;
}
