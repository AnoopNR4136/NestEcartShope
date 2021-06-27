import { Injectable, NotFoundException } from '@nestjs/common';

import { InjectRepository } from '@nestjs/typeorm';
import { CreateAuthDto } from 'src/auth/dto/create-auth.dto';
import { CreateAdressDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
   // private jwtService:JwtService
) { }
  createUser(createUserDto: CreateUserDto): Promise<{}> {
    return this.userRepository.createUser(createUserDto)
  }
  addAdress(createAdressDto:CreateAdressDto,user:User) {
    return this.userRepository.addAdress(createAdressDto,user)
  }
  updatePrimaryAdress(id:string,user: User){
    return this.userRepository.updatePrimaryAdress(id,user)
  }
  
  
  // findAll() {
  //   return `This action returns all user`;
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} user`;
  // }

  updatePhoneNumber(updateUserDto: UpdateUserDto,user:User) {
    console.log('services')
    return this.userRepository.updatePhoneNumber(updateUserDto,user);
  }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
