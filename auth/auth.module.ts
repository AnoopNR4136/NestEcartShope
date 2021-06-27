import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from 'src/user/user.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AdminRepository } from 'src/admin/admin.repository';
import { JwtStartegy } from './jwt.strategy';

@Module({
  imports:[TypeOrmModule.forFeature([UserRepository,AdminRepository]),
  PassportModule.register({defaultStrategy:'jwt'}),
  JwtModule.register({secret:'topSecret51',
  signOptions:{expiresIn:36000}})],
  controllers: [AuthController],
  providers: [AuthService,UserService,JwtStartegy],
  exports:[JwtStartegy,
    PassportModule]

})
export class AuthModule {}
