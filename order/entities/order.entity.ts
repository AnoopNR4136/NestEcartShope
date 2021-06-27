import { Product } from "src/product/entities/product.entity";
import { User } from "src/user/entities/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { OrderDetails } from "./order.details.entity";
@Entity()
export class Order extends BaseEntity{
    @PrimaryColumn()
    oder_ID :string;

    @ManyToOne(type=>User,user=>user.user_id)
    user_id:User;

    @Column({type : Date,default: ()=>'CURRENT_DATE'})
    oder_date :Date

    @Column()
    order_total :number

    @Column({default:0})
    order_status : number

    // @OneToMany(type=>OrderDetails,orderdetails=>orderdetails.orderDetails_ID)
    // orderDetails_ID:OrderDetails

    // @Column()
    // orderDetails_ID:string
    

}
