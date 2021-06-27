import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AdminRepository } from 'src/admin/admin.repository';
import { UserRepository } from 'src/user/user.repository';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtPayload } from './payloadInterface/payload';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    @InjectRepository(AdminRepository)
    private adminRepository: AdminRepository,
    private jwtService: JwtService

  ) { }
  signIn(createAuthDto: CreateAuthDto) {
    return this.userLoginCheck(createAuthDto);
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
  async userLoginCheck(createAuthDto: CreateAuthDto) {
    const { username, password } = createAuthDto;
    const userResult = await this.userRepository.findOne({ where: [{ user_email: username }, { user_phone: username }, { user_username: username }] })
    const adminResult = await this.adminRepository.findOne({ where: { admin_username: username, admin_password: password } })
    //console.log(result)
    if (userResult) {
      const checkPassword = await userResult.checkPassword(password);
      //  console.log(checkPassword)
      if (checkPassword) {

        const payload: JwtPayload = { username }
        const accessToken = await this.jwtService.sign(payload)
        return { accessToken }
      }
      else {
        throw new NotFoundException("invalid Password !!!")
      }
    }
    else if (adminResult) {
      const payload: JwtPayload = { username }
      const accessToken = await this.jwtService.sign(payload)
      return { accessToken }

    } else {
      throw new NotFoundException("invalid Username or  Password !!!")
    }

  }

}



