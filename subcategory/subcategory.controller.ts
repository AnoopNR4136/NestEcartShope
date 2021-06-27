import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SubcategoryService } from './subcategory.service';
import { CreateSubcategoryDto } from './dto/create-subcategory.dto';
import { UpdateSubcategoryDto } from './dto/update-subcategory.dto';
import { InsertResult } from 'typeorm';
import { Subcategory } from './entities/subcategory.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';

@Controller('subcategory')
@ApiTags('Subcategory')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class SubcategoryController {
  constructor(private readonly subcategoryService: SubcategoryService) {}

  @Post('createSubcategory')
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('file',{storage:diskStorage({
    destination : "./Imagesubcategory",

    filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      return cb(null, `${randomName}${extname(file.originalname)}`)}


  
  })}))




  createSubcategory(@Body(ValidationPipe) createSubcategoryDto: CreateSubcategoryDto,
  @UploadedFile() file: Express.Multer.File):Promise<Subcategory> {
    console.log('controller')
    return this.subcategoryService.createSubCategory(createSubcategoryDto,file);
  }

  @Get()
  findAll() {
    return this.subcategoryService.findAll();
  }

  @Get('subCategoryView/:id')
  subCategoryView(@Param('id') id: string) {
    return this.subcategoryService.subCategoryView(id);
  }

  @Patch('updateSubCategory/:id')
  updateSubCategory(@Param('id') id:string,@Body(ValidationPipe) createSubcategoryDto:CreateSubcategoryDto) {
    return this.subcategoryService.updateSubCategory(createSubcategoryDto,id);
  }

  @Delete('deleteSubCategory/:id')
  deleteSubCategory(@Param('id') id: string) {
    return this.subcategoryService.deleteSubCategory(id);
  }
}
