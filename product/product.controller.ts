import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto, PrductImageDto, ProducRatingtDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { Product } from './entities/product.entity';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/user/dto/get-user-decorator';
import { ApiBasicAuth, ApiBearerAuth, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { editFileName, editFileNames } from 'src/common/file-upload';

@Controller('product')
@ApiTags('Product')
@ApiBearerAuth()
@UseGuards(AuthGuard())
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post('createProduct')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: "./ImageProduct",

      filename: editFileName
    })
  }))

  @ApiConsumes('multipart/form-data')
  createProduct(@Body() createProductDto: CreateProductDto,
    @UploadedFile() file: Express.Multer.File
  ): Promise<Product> {
    return this.productService.createProduct(createProductDto, file);
  }



  @Get('productView/:id')
  productView(@GetUser() userAuth: User, @Param('id') id: string) {
    return this.productService.productView(id, userAuth);
  }

  @Patch('updateProduct/:id')
  updateProduct(@Param('id') id: string, @Body() productDto: CreateProductDto): Promise<any> {
    return this.productService.updateProduct(productDto, id);
  }

  @Delete('deleteProduct/:id')
  deleteProduct(@Param('id') id: string): Promise<DeleteResult> {
    return this.productService.deleteProduct(id);
  }

  @Post('productRating/:id')
  ProductRating(@Param('id') product_id: string, @Body() producratetDto: ProducRatingtDto, @GetUser() user_id: User) {
    return this.productService.ProductRating(product_id, user_id, producratetDto)
  }

  @Get('allProductView')
  allProductView() {
    return this.productService.allProductView();
  }


  //ARRAY OF FILE UPLOAD
  @Post('multiProductUpload/:id')
  @UseInterceptors(FilesInterceptor('product_image_image', 5, {
    storage: diskStorage({
      destination: "./ImageProducts",

      filename: editFileNames
    })
  }))
  @ApiConsumes('multipart/form-data')
  multiProductUpload(
    @Param('id') product_id: string,
    @Body() prductImageDto: PrductImageDto,
    @UploadedFiles() files) {


    // const response = [];
    // files.forEach(file => {
    //   const fileReponse = {
    //     originalname: file.originalname,
    //     filename: file.filename,
    //   };
    //   response.push(fileReponse);
    // });

// console.log(files);
 return this.productService.multiProductUpload(product_id, files)


  }
}
