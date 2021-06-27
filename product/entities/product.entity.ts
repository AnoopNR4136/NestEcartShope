import { Cart } from "src/cart/entities/cart.entity";
import { Subcategory } from "src/subcategory/entities/subcategory.entity";
import { User } from "src/user/entities/user.entity";
import { Wishlist } from "src/wishlist/entities/wishlist.entity";
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { ProductImages } from "./productimages.entity";
import { ProductRatingByUser } from "./productrate.entity";
@Entity()
@Unique(['product_name'])
export class Product extends BaseEntity {
@PrimaryGeneratedColumn()
product_id : number;

@Column()
product_name : string;

@Column()
product_rate : number;

@Column()
product_stock :number;

@Column({default :'imgs'})
product_image :string;

@Column({default :0})
product_rating :number;//total rate avg (max 5)


@Column({default :0})
product_ratingusercount :number;//count of user rate this item

@Column()
product_description : string;


@Column({default:true})
product_status : boolean;

@ManyToOne(type=>Subcategory , subcategory=>subcategory.subcategory_id)
subcategory_id : Subcategory;


@OneToMany(type=>Cart,cart=>cart.cart_id)
cart_id :Cart


@OneToMany(type=>Wishlist,wishlist=>wishlist.wishlist_id)
wishlist_id :Wishlist;


@OneToMany(type=>ProductImages,id=>id.product_image_id)
product_image_id :ProductImages;



@OneToMany(type=>ProductRatingByUser ,rate=>rate.rating_id)
rating_id : ProductRatingByUser

}

