import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InsertResult } from 'typeorm';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { Subcategory } from './entities/subcategory.entity';
import { SubCategoryRepository } from './subcategory.repository';


@Injectable()
export class SubcategoryService {


constructor(
@InjectRepository(SubCategoryRepository)
private subCategoryRepository:SubCategoryRepository
){}

createSubCategory(createSubcategoryDto: CreateSubcategoryDto,file: Express.Multer.File):Promise<Subcategory> {
  console.log('services')
    return this.subCategoryRepository.createSubCategory(createSubcategoryDto,file);
  }

  findAll() {
    return `This action returns all subcategory`;
  }

  subCategoryView(id: string) {
    return this.subCategoryRepository.subCategoryView(id);
  }

  updateSubCategory(createSubcategoryDto:CreateSubcategoryDto,id:string) {
    return this.subCategoryRepository.updateSubCategory(createSubcategoryDto,id);
  }

  async deleteSubCategory(id: string) {

    if(await this.subCategoryRepository.findOne(id)){
      if(await this.subCategoryRepository.delete(id)){
      return {delete : true,id : id}
      }
      else{
        return {delete : false,id : id}
      }
    }
    else
    return {delete : false,id : id,status:"Data Not Found"}
  }  
}
