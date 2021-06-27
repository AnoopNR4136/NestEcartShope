import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { WishlistService } from './wishlist.service';
import { CreateWishlistDto } from './dto/create-wishlist.dto';
import { UpdateWishlistDto } from './dto/update-wishlist.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { GetUser } from 'src/user/dto/get-user-decorator';
import { ApiTags } from '@nestjs/swagger';

@Controller('wishlist')
@UseGuards(AuthGuard())
@ApiTags('WishList')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Post('updatewishlist')
  updateWishlist(@GetUser() userAuth:User,@Body()createWishlistDto:CreateWishlistDto) {
    return this.wishlistService.updateWishlist(createWishlistDto,userAuth);
  }

  @Get('viewWishlist')
  viewUserWishlist(@GetUser() userAuth:User) {
    return this.wishlistService.viewUserWishlist(userAuth);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.wishlistService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWishlistDto: UpdateWishlistDto) {
    return this.wishlistService.update(+id, updateWishlistDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wishlistService.remove(+id);
  }
}
