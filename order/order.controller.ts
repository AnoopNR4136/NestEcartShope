import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { CreateCategoryDto } from 'src/category/dto/create-category.dto';
import { OrderDetails } from './entities/order.details.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/dto/get-user-decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('order')
@ApiTags('Order')
@UseGuards(AuthGuard())
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('createOrder')
  createOrder(@GetUser() userAuth:User,@Body() createOrderDto: CreateOrderDto) {
    console.log("USER"+userAuth.user_id)
     return this.orderService.createOrder(createOrderDto,userAuth);
    // createOrderDto.cart_list.map(product=>{
    //   console.log(product)
    // })
  // let orderChildArr = new Array<OrderDetails>()
  // createOrderDto.cart_list.map(product =>{
  //   let orderChild = new OrderDetails()

  //   // orderChild.orderDetails_ID.

  //   orderChildArr.push(orderChild)
  // })

  
  
  }

  @Get('userOrderView')
  userViewOrder(@GetUser() userAuth:User) {
    return this.orderService.userViewOrder(userAuth);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @Patch('adminupdatestatus/:id')
  adminUpdateOrderStatus(@Param('id') id: string, ) {
    return this.orderService.adminUpdateOrderStatus(id);
  }

  @Patch('userCancelOrder/:id')
  userUpdateStatus(@Param('id') id: string,@Body()UserId:string ) {
    return this.orderService.userUpdateStatus(id,UserId);
  }

  


  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
