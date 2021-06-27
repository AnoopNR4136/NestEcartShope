import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, UseInterceptors, UploadedFile, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { editFileName } from '../common/file-upload'
import { UpdateResult } from 'typeorm';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';

@Controller('category')
@ApiTags('Category')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class CategoryController {
  constructor(private readonly categoryService: CategoryService
    // ,private readonly fileuploadsService: FileuploadsService
    ) {}

  @Post('CreateCategory')
  //file Upload
  @UseInterceptors(FileInterceptor('category_image',{storage:diskStorage({
    destination : "./Imagecategory",
    
    filename: (req, file, cb) => {
      
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      return cb(null, `${randomName}${extname(file.originalname)}`)}
  })}))


  @ApiConsumes('multipart/form-data')
  crecreateCategoryate(
    @Body(ValidationPipe) createCategoryDto: CreateCategoryDto,
    @UploadedFile() file: Express.Multer.File) :Promise<Category> {
    console.log('controller')
    return this.categoryService.createCategory(createCategoryDto,file);
  }

  @Get('categoryView')
  categoryView() {
    return this.categoryService.categoryView();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.categoryService.findOne(+id);
  // }

  @Patch('updateCategory/:id')
  @UseInterceptors(FileInterceptor('category_image',{storage:diskStorage({
    destination : "./Imagecategory",
    filename :editFileName, 
  })}))
  @ApiConsumes('multipart/form-data')
  updateCategory(
  @Param('id') id: string, 
  @Body() categoryDto:UpdateCategoryDto,
  @UploadedFile() file: Express.Multer.File):Promise<UpdateResult> {
    
    return this.categoryService.updateCategory(categoryDto,id,file);
  }








  @Delete('deletecategory/:id')
  deletecategory(@Param('id') id: string) {
    return this.categoryService.deletecategory(id);
  }








 
}
