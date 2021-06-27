import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { WishlistRepository } from './wishlist.repository';

@Injectable()
export class WishlistService {

constructor(
  @InjectRepository(WishlistRepository)
  private wishlistRepository : WishlistRepository
  ){}


  updateWishlist(createWishlistDto:CreateWishlistDto,userAuth:User) {
    return this.wishlistRepository.updateWishlist(createWishlistDto,userAuth);
  }

  viewUserWishlist(userAuth:User) {
    return this.wishlistRepository.viewUserWishlist(userAuth);
  }

  findOne(id: number) {
    return `This action returns a #${id} wishlist`;
  }

  update(id: number, updateWishlistDto: UpdateWishlistDto) {
    return `This action updates a #${id} wishlist`;
  }

  remove(id: number) {
    return `This action removes a #${id} wishlist`;
  }
}
