import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AddAdress } from './entities/user.entity';

@Module({
  imports : [TypeOrmModule.forFeature([UserRepository,AddAdress]),
  PassportModule.register({defaultStrategy:'jwt'})],
  // JwtModule.register({secret:'topSecret51',
  // signOptions:{expiresIn:36000}})],
  controllers: [UserController],
  providers: [UserService],
  // exports:[JwtStartegy,
  //   PassportModule]

})
export class UserModule {}
