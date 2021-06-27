import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { CartRepository } from './cart.repository';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class CartService {

constructor(
@InjectRepository(CartRepository)
private cartRepository :CartRepository
){}


  createCart(createCartDto: CreateCartDto,UserId:User) {
    return this.cartRepository.createCart(createCartDto,UserId);
  }

  findAll() {
    return `This action returns all cart`;
  }

  viewCart(id: string,UserID:User) {
    return this.cartRepository.viewCart(id,UserID);
  }

  updateCart(id: string, updateCartDto: CreateCartDto) {
    return this.cartRepository.updateCart(id,updateCartDto);
  }

  deleteCart(id: string) {
    return this.cartRepository.deleteCart(id);
  }
}
