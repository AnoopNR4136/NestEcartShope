import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreateCartDto {
@IsNotEmpty()
@IsNumber()
product_id :Product;

@IsNumber()
@IsNotEmpty()
cart_quantity : number;

@IsString()
@IsNotEmpty()
user_id : User;



}
