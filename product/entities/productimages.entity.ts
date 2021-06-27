import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity()
export class ProductImages extends BaseEntity{
    
    @PrimaryGeneratedColumn()
    product_image_id :number;
    
    @ManyToOne(type=>Product,product=>product.product_id)
    product_id : Product;

    @Column()
    product_image_image : string;
}
