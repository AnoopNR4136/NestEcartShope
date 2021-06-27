import { ApiProperty } from "@nestjs/swagger";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { CartArrayDto } from "./cartarray.dto";


export class CreateOrderDto {
@ApiProperty()
user_id : User;

cart_list:Array<CartArrayDto>;
}
