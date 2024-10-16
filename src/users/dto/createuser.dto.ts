import { IsString,IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';


export class CreateUserDto {

    @ApiProperty()
    @IsEmail()
    email: string;
    
    @ApiProperty()
    @IsString()
    password: string;

    @ApiProperty()
    @IsString()
    role?: string; 
    
}