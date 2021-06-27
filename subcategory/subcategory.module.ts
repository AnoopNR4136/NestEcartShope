import { Module } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { SubcategoryController } from './subcategory.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { SubCategoryRepository } from './subcategory.repository';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports : [TypeOrmModule.forFeature([SubCategoryRepository]),
  PassportModule.register({defaultStrategy:'jwt'})],
  controllers: [SubcategoryController],
  providers: [SubcategoryService]
})
export class SubcategoryModule {}
