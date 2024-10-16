import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schema/user.schema';
export declare class AuthService {
    private readonly userModel;
    private readonly jwtService;
    private readonly jwtSecret;
    private readonly saltLength;
    constructor(userModel: Model<User>, jwtService: JwtService);
    private hashPassword;
    private validatePassword;
    register(email: string, password: string): Promise<User>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    validateToken(token: string): Promise<any>;
    hasRole(user: any, requiredRoles: string[]): Promise<boolean>;
}
