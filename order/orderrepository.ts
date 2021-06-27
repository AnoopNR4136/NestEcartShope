import { EntityRepository, Repository } from "typeorm";
import { Order } from "./entities/order.entity";
import { v4 as uuidv4 } from 'uuid';
import { CreateOrderDto } from "./dto/create-order.dto";
import { stringify } from "node:querystring";
import { OrderViewInterface } from "./interface/orderViewInterface";
import { User } from "src/user/entities/user.entity";

@EntityRepository(Order)
export class OrderRepository extends Repository<Order>{

async createOrder(CreateOrderDto:CreateOrderDto,userId:User) :Promise<string>{
    
    const orderID = uuidv4();
    // const orderDetId= uuidv4();
    const order =new Order();
    order.oder_ID = orderID;
    let uid  =userId.user_id as any;
    
    order.user_id = uid;
    order.order_total =0;
    //order.orderDetails_ID = orderDetId;
    try{
        console.log("save")
        if(await order.save())
        {
        console.log(orderID);
        return orderID;
        }
        else
        {
            return null;
        }
    }catch(err){
        console.log("EEEEror")
        console.log(err)
    }
}

// async viewUserOrder(userID:string ){



//     const select = this.createQueryBuilder().innerJoinAndSelect()



// }


async adminUpdateOrderStatus(orderID:string){
    const getOrder=await this.findOne(orderID)
   // console.log(getOrder)
    if(getOrder)
    {
        getOrder.order_status = 1;
        try{
           await getOrder.save()
        }catch(err)
        {console.log(err)}
    }
}

async userUpdateStatus(orderID:string,UserId:string){
// const {userId}=UserId.valueOf()
const userId='406ff4ee-851c-433b-af69-4440c248a8df'
const getOrder =await this.createQueryBuilder('order')
// .leftJoinAndSelect('order.user_id','user')
.where('order.oder_ID=:orderID',{orderID:orderID})
.andWhere('order.order_status=1')
.andWhere('order.user_id=:UserId',{UserId:userId}).getOne()
// findOne({where :{oder_ID:orderID,user_id:UserId}})
// {where :{user_id:UserId,oder_ID:orderID}})
console.log(getOrder)
if(getOrder)
getOrder.order_status=3
try{
    getOrder.save()
}catch(err){
    console.log(err)
}

//console.log(getOrder);
}

// return this.query('SELECT round(sum(coin_count),2) as tot_score, gh.user_id,  pr.name, pr.photo
//  FROM coin_log gh INNER JOIN profile pr ON pr."userUserId" = gh.user_id 
// WHERE gh.coin_type_id = 3 AND gh.coin_status =\'GAIN\' AND date_trunc(\'month\',gh.update_date) = date_trunc(\'month\',CURRENT_DATE) 
// GROUP BY gh.user_id, pr.name, pr.photo  ORDER BY tot_score DESC')

async userViewOrder(userAuth:User):Promise<any>{
     const userId="'"+userAuth.user_id+"'"
    // const userId=userAuth.user_id
    // const getOrder = await this.createQueryBuilder('order')
    // .where('order.user_id=:userId',{userId:userId})
    // .andWhere('order.order_status=1 OR order.order_status=2').getMany()
    console.log(" UserID "+userId)
try{
    const viewOrder=await this.query('select * from "order" o inner join "order_details" od on o."oder_ID"=od."oder_ID" Inner join "product" pr on pr."product_id" = od."productIdProductId" Inner Join "subcategory" st on st."subcategory_id" = pr."subcategoryIdSubcategoryId" inner join "category" ct on ct."category_id" = st."categoryIdCategoryId" where o."userIdUserId"='+userId+' ')
    // and (o."order_status"=1 or o."order_status"=2)')
    
    // let orderviewinterface :OrderViewInterface ={oder_date:viewOrder.oder_date,product_id:viewOrder.product_id,order_status:viewOrder.order_status,order_total:viewOrder.t}
    console.log((viewOrder))
    return {viewOrder};
    
}catch(err){
    console.log(err)
}
    


}




}





