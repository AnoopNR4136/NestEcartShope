import { EntityRepository, getConnection, getRepository, PersistedEntityNotFoundError, Repository } from "typeorm";
import { CreateOrderDto } from "./dto/create-order.dto";
import { Order } from "./entities/order.entity";
import { v4 as uuidv4 } from 'uuid';
import { OrderDetails } from "./entities/order.details.entity";
import { ProductUpdate } from "./interface/productinterface";


@EntityRepository(OrderDetails)
export class OrderDetailsRepository extends Repository<OrderDetails> {

    async createOrder(orderID:string,createOrderDto:CreateOrderDto) : Promise<ProductUpdate[]>{
            const orderDetId= uuidv4();
            //console.log(orderDetId)
            let orderChild =new Array<OrderDetails>()
            let productUpdateArray= new Array<ProductUpdate>()
            let total=0;
            createOrderDto.cart_list.map(product=>{
                let  orderDetails = new OrderDetails()
                

                orderDetails.oder_ID= orderID;
                orderDetails.orderDetails_ID =orderDetId
                orderDetails.product_id = product.product_id;
                orderDetails.orderDetails_qty = product.orderDetails_qty;
                total=total+product.orderDetails_total*product.orderDetails_qty;
                orderDetails.orderDetails_total = product.orderDetails_total;
                orderChild.push(orderDetails)
                console.log(product.product_id)
                
                let productUpdate :ProductUpdate ={product_id:product.product_id,product_qty:product.orderDetails_qty}
                // productUpdate.product_id = product.product_id;
                // productUpdate.product_qty = product.orderDetails_qty;



                productUpdateArray.push(productUpdate)
            })
            try{
                await this.save(orderChild)
                console.log("OderID="+orderID);
                const query = await getRepository(Order).createQueryBuilder().update().set({order_total:total})
                .where('oder_ID=:oder_ID',{oder_ID:orderID}).execute();
                if(query.affected){
                    return productUpdateArray;
                }




            }catch(err){
                console.log(err)
            }
    }





}


 