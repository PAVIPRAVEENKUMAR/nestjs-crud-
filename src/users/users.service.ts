import { Injectable } from '@nestjs/common';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [
    {
      id: 1,
      username: 'john',
      email: 'john@example.com',
      password: 'changeme', 
    },
    {
      id: 2,
      username: 'chris',
      email: 'chris@example.com',
      password: 'secret',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}