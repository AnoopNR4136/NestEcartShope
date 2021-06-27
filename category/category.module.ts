import { Module } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryRepository } from './category.repository';
import { PassportModule } from '@nestjs/passport';
import { FileuploadsService } from 'src/fileuploads/fileuploads.service';

@Module({
  imports:[TypeOrmModule.forFeature([CategoryRepository]),
  PassportModule.register({defaultStrategy:'jwt'})],
  controllers: [CategoryController],
  providers: [CategoryService]
})
export class CategoryModule {}
