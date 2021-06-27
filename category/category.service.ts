import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult } from 'typeorm';
import { CategoryRepository } from './category.repository';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {

  constructor(
    @InjectRepository(CategoryRepository)
    private categoryRepository: CategoryRepository

  ) { }

  createCategory(createCategoryDto: CreateCategoryDto,file: Express.Multer.File): Promise<Category> {
    console.log('Serviceess')
    return this.categoryRepository.createCategory(createCategoryDto,file);
  }

  categoryView() :Promise<Category[]>{
    return this.categoryRepository.categoryView();
  }

  findOne(id: number) {
    return `This action returns a #${id} category`;
  }

  updateCategory(categoryDto:UpdateCategoryDto, id: string,file: Express.Multer.File): Promise<UpdateResult> {
    // console.log(file.originalname)
    
    return this.categoryRepository.updateCategory(categoryDto, id,file);
  }

  async deletecategory(id: string) {
    return this.categoryRepository.deletecategory(id);
  //   if (await this.categoryRepository.findOne(id)) {
  //     if (await this.categoryRepository.delete(id)) {
  //       return { deleted: true, id: id }
  //     }
  //     else {
  //       return { deleted: false, id: id }
  //     }
  //   }
  //   else
  //     return { deleted: false, id: id, status: "Data Not Found" }
  }
}
