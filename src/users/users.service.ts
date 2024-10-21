import { Injectable,forwardRef, Inject} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './users.schema';
import { AuthService } from '../auth/auth.service';  
import { CreateUserDto } from 'src/auth/dto/createuser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>, 
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,  
  ) {}
  
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const { email, password, role } = createUserDto;
    const { salt, hash } = await this.authService.hashPassword(password);  
    const newUser = new this.userModel({ email, password: hash, salt, role});
    return newUser.save();  
  }

  async findUserByEmail(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec();  
   }

  async findUserById(id: string): Promise<User | undefined> {
    return this.userModel.findById(id).exec();  
  }
}