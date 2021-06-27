import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartRepository } from './cart.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports :[TypeOrmModule.forFeature([CartRepository]),
  PassportModule.register({defaultStrategy:'jwt'})],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
