import { PartialType } from '@nestjs/swagger';
import { IsMobilePhone, IsNotEmpty } from 'class-validator';
import { Unique } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
//@Unique(['user_phone'])
export class UpdateUserDto extends PartialType(CreateUserDto) {
    @IsNotEmpty()
    @IsMobilePhone()
    
    user_phone :string;
}
