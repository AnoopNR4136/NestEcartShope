import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Subcategory } from "src/subcategory/entities/subcategory.entity";
import { Product } from "../entities/product.entity";

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    product_name : string;

    @IsNumber()
    @IsNotEmpty()
    product_rate : number;

    @IsNumber()
    @IsNotEmpty()
    product_stock :number;

    @IsNumber()
    @IsNotEmpty()
    subcategory_id : Subcategory;

    @IsString()
    @IsNotEmpty()
    product_description : string;   
}
export  class ProducRatingtDto{
    rating_count :number;
    
}
export class PrductImageDto{
    // @IsNumber()
    // @IsNotEmpty()
    // product_id : Product;

    @ApiProperty({ type: 'string', format: 'binary' ,isArray:true})
    product_image_image : any;
}
