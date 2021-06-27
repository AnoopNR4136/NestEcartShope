import { EntityRepository, Repository } from "typeorm";
import { Cart } from "./entities/cart.entity";
import { CreateCartDto } from './dto/create-cart.dto'
import { User } from "src/user/entities/user.entity";
@EntityRepository(Cart)
export class CartRepository extends Repository<Cart>{

async createCart(createCartDto:CreateCartDto ,UserId:User ){
    const{product_id,cart_quantity,user_id} = createCartDto;
    const cart = new Cart()
    cart.user_id=UserId as any
    cart.product_id = product_id;
    cart.cart_quantity = cart_quantity;
    console.log(createCartDto.user_id+"  "+createCartDto.product_id)
    try{
        // const id= user_id;
        
        // const select = await this.createQueryBuilder('cart')
        //.leftJoinAndSelect('cart.user_id','user')
        // .innerJoin('cart.product_id','product')
        // .getMany()
        // console.log(select)



        // console.log(await cart.save())
        const cartdata = await cart.save();
    //const insert = this.createQueryBuilder().insert().values({cart_quantity:cart_quantity,user_id:user_id,product_id:product_id})
     return {cartdata};
}catch(err)
    {console.log(err)}
}

async viewCart(id:string,UserID:User):Promise<Cart[]>{
    try{
        // const userID='57a46d2d-28b5-433e-b440-155197237157'
        const userID=UserID.user_id as any;
        // console.log(UserID)
        const select = await this.createQueryBuilder('cart')
        .leftJoinAndSelect('cart.product_id','product')
        .andWhere('cart.user_id=:id',{id:userID})
        .getMany()
        return select;
    console.log(select)
    }catch(err)
    {console.log(err)}
}


async updateCart(id:string,cartDto:CreateCartDto){
    const { cart_quantity } =cartDto;
    try{
     const update =await this.createQueryBuilder().update()
    .set({cart_quantity:cart_quantity})
    .where('cart_id=:id',{id:id}).execute();
    console.log(update);
    return {message :"Cart Updated",id:id}

    }catch(err){
        console.log(err)
    }
}
async deleteCart(id:string)
{
    try{
        const deleteCart =await this.createQueryBuilder().delete().where('cart_id=:id',{id:id}).execute()
        console.log(deleteCart);
        return {}
    }catch(err){
        console.log(err)
    }
}


}