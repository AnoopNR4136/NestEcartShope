import { Product } from "src/product/entities/product.entity";

export interface ProductUpdate{
    product_id : Product;
    product_qty :number;
}