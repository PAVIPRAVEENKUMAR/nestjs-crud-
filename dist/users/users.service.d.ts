import { User } from './user.entity';
export declare class UsersService {
    private users;
    findOne(username: string): Promise<User | undefined>;
}
