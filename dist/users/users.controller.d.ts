import { AuthService } from '../auth/auth.service';
import { CreateUserDto } from '../users/dto/user.dto';
export declare class UsersController {
    private readonly authService;
    constructor(authService: AuthService);
    register(body: CreateUserDto): Promise<import("./schema/user.schema").User>;
    login(body: {
        email: string;
        password: string;
    }): Promise<{
        token: string;
    }>;
    getProfile(authHeader: string): Promise<{
        message: string;
        user: any;
    }>;
    getAdmin(authHeader: string): Promise<{
        message: string;
    }>;
}
