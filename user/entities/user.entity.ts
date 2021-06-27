import { Cart } from "src/cart/entities/cart.entity";
import { Order } from "src/order/entities/order.entity";
import * as bcrypt from 'bcrypt'

import { BaseEntity, Column, Entity, Generated, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Wishlist } from "src/wishlist/entities/wishlist.entity";
import { Address } from "node:cluster";
import { ProductRatingByUser } from "src/product/entities/productrate.entity";


@Entity('tbl_user')
@Unique(['user_email'])
export class User extends BaseEntity {
    @Column()
    @PrimaryColumn()
    // @Generated('uuid')
    user_id: string;

    @Column()
    //  @Generated('uuid')
    user_name: string;

    @Column()
    user_email: string;

    @Column({ unique: true })
    //  @Generated('uuid')
    user_phone: string;

    @Column()
    //  @Generated('uuid')
    user_username: string;

    @Column()
    user_password: string;

    @Column()
    user_salt: string;

    @Column()
    user_pwd: string;


    @OneToMany(type => Cart, cart => cart.cart_id)
    cart_id: Cart

    @OneToMany(type => Order, order => order.oder_ID)
    oder_ID: Order

    @OneToMany(type => Wishlist, wishlist => wishlist.wishlist_id)
    wishlist_id: Wishlist;

    @OneToMany(type => AddAdress, adress => adress.adress_id)
    adress_id: Address


    @OneToMany(type => ProductRatingByUser, rate => rate.rating_id)
    rating_id: ProductRatingByUser


    async checkPassword(password: string): Promise<boolean> {
        console.log(this.user_email + " Pwd")
        console.log(password + "  " + this.user_salt)
        const hash = await bcrypt.hash(password, this.user_salt);
        return hash === this.user_password;
    }


}



//adress
@Entity('tbl_adress')
export class AddAdress extends BaseEntity {
    @PrimaryGeneratedColumn()
    adress_id: number;

    @Column()
    adress_name: string;

    @Column()
    adress_adress: string;

    @Column()
    adress_phone: string;

    @Column()
    adress_alt_phone: string;

    @Column()
    adress_state: string;

    @Column()
    adress_city: string;

    @Column()
    adress_pin: string;

    @Column({ default: false })
    adress_status: boolean


    @ManyToOne(type => User, user => user.user_id)
    user_id: User

}
