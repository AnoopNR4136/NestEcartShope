import { type } from "node:os";
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Cart extends BaseEntity {
@PrimaryGeneratedColumn()
cart_id : number;

@ManyToOne(type=>User,user=>user.user_id)
user_id : User;

@ManyToOne(type=>Product,product=>product.product_id)
product_id :Product;

@Column()
cart_quantity : number;

@Column({type : Date,default: ()=>'CURRENT_DATE'})
cart_date :string

}
