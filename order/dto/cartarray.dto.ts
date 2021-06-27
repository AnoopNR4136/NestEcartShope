import { Product } from "src/product/entities/product.entity";

export class CartArrayDto {
    
product_id : Product;

orderDetails_qty:number;

orderDetails_total :number;
}