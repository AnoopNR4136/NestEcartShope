import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Product } from "./product.entity";

@Entity('tbl_rating')
export class ProductRatingByUser extends BaseEntity{
@PrimaryGeneratedColumn()
rating_id : number;

@ManyToOne(type=>Product,product=>product.product_id)
product_id : Product;

@ManyToOne(type=>User,user=>user.user_id)
user_id : User;

@Column()
rating_count :number;

}