import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdminRepository } from './admin.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports:[TypeOrmModule.forFeature([AdminRepository]),
  PassportModule.register({defaultStrategy:'jwt'})],
  controllers: [AdminController],
  providers: [AdminService]
})
export class AdminModule {}
