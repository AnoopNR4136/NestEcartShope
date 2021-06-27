import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { DeleteResult, InsertResult, UpdateResult } from 'typeorm';
import { CreateProductDto, PrductImageDto, ProducRatingtDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {

constructor(
  @InjectRepository(ProductRepository)
  private productRepository :ProductRepository
){}


   
  createProduct(productDto:CreateProductDto,file: Express.Multer.File):Promise<Product>{
    return this.productRepository.createProduct(productDto,file);
  }

  

  productView(id: string, userAuth:User) {
    return this.productRepository.productView(id,userAuth);
  }

  updateProduct(productDto:CreateProductDto,id:string):Promise<any> {
    return this.productRepository.updateProduct(productDto,id);
  }

  async deleteProduct(id:string) :Promise<any>{
    if(await this.productRepository.findOne(id)){
      if(await this.productRepository.delete(id)){
      return {deleted : true,id : id}
      }
      else{
        return {deleted : false,id : id}
      }
    }
    else
    return {deleted : false,id : id,status:"Data Not Found"}
  }


  ProductRating(product_id: string, user_id: User, producratetDto: ProducRatingtDto){
return this.productRepository.ProductRating(product_id,user_id,producratetDto)
  }

  allProductView() {
    return this.productRepository.allProductView();
  }



  multiProductUpload(product_id : string,files :any){
    //console.log(files)
     return this.productRepository.multiProductUpload(product_id,files)
  }
}
