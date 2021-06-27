import { type } from "node:os";
import { Category } from "src/category/entities/category.entity";
import { Product } from "src/product/entities/product.entity";
import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
@Entity()
@Unique(['subcategory_name'])
export class Subcategory extends BaseEntity {

@PrimaryGeneratedColumn()
subcategory_id :number;

@Column()
subcategory_name : string;

@ManyToOne(type=>Category , category=>category.subcategory_id)
category_id : Category;


@OneToMany(type=>Product , product=>product.subcategory_id)
product_id : Product

@Column()
subcategory_image : string;

}
