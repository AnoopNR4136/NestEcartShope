import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductRepository } from './product.repository';
import { PassportModule } from '@nestjs/passport';
import { ProductRatingByUser } from './entities/productrate.entity';
import { ProductImages } from './entities/productimages.entity';



@Module({
  imports : [TypeOrmModule.forFeature([ProductRepository,ProductRatingByUser,ProductImages]),
  PassportModule.register({defaultStrategy:'jwt'})],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
