import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderRepository } from './orderrepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderDetailsRepository } from './orderdetails.repository';
import { ProductRepository } from 'src/product/product.repository';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports :[TypeOrmModule.forFeature([OrderRepository,OrderDetailsRepository,ProductRepository]),
  AuthModule,
  PassportModule.register({defaultStrategy:'jwt'})],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
