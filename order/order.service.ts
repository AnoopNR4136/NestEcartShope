import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductRepository } from 'src/product/product.repository';
import { User } from 'src/user/entities/user.entity';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProductUpdate } from './interface/productinterface';
import { OrderDetailsRepository } from './orderdetails.repository';
import { OrderRepository } from './orderrepository';

@Injectable()
export class OrderService {

constructor(
  @InjectRepository(OrderDetailsRepository)
  private orderDetailsRepository:OrderDetailsRepository,
  private orderRepository:OrderRepository,
  private productRepository:ProductRepository )
  {

}
  async createOrder(createOrderDto: CreateOrderDto,userId:User) {
    const oderID=await this.orderRepository.createOrder(createOrderDto,userId)
    if(oderID) {
      
      let productUpdateArray= new Array<ProductUpdate>()
      productUpdateArray = await this.orderDetailsRepository.createOrder(oderID,createOrderDto);
      this.productRepository.updateProductQty(productUpdateArray)
    }
    

  }

  findAll() {
    return `This action returns all order`;
  }

  findOne(id: number) {
    return `This action returns a #${id} order`;
  }

  adminUpdateOrderStatus(id: string) {
    return this.orderRepository.adminUpdateOrderStatus(id);
  }
  userUpdateStatus(orderID: string,UserId:string) {
    return this.orderRepository.userUpdateStatus(orderID,UserId);
  }


  userViewOrder(userAuth:User){
    return this.orderRepository.userViewOrder(userAuth);
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }
}
