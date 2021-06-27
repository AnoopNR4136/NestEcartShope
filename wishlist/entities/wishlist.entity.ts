
import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class Wishlist extends BaseEntity {
    @PrimaryGeneratedColumn()
    wishlist_id :number;

    @ManyToOne(type=>User,user=>user.user_id)
    user_id :User

    @ManyToOne(type=>Product,product=>product.product_id)
    product_id : Product

    @Column()
    wishlist_status :boolean



}
