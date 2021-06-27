
import { Product } from "src/product/entities/product.entity";

import { BaseEntity, Column, Entity,ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
@Entity()
export class OrderDetails extends BaseEntity {

    @PrimaryGeneratedColumn()
    id:number

    @Column()
    orderDetails_ID :string
    
    // @ManyToOne(type=>Order,order=>order.oder_ID)
    // oder_ID :Order;
    @Column()
    oder_ID : string
    
    @ManyToOne(type=>Product,product=>product.product_id)
    product_id:Product;
    
    @Column()
    orderDetails_qty:number;
    
    @Column()
    orderDetails_total :number;
    }