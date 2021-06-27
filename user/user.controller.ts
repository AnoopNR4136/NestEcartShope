import { Controller, Get, Post, Body, Patch, Param, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateAdressDto, CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './dto/get-user-decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('User')

export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post('createUser')
  createUser(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{}> {
    return this.userService.createUser(createUserDto);
  }
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Post('addAdress')
  addAdress(@GetUser() user: User, @Body(ValidationPipe) createAdressDto: CreateAdressDto) {
    return this.userService.addAdress(createAdressDto, user);
  }

  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('phoneupdate')
  updatePhoneNumber(@GetUser() user: User, @Body(ValidationPipe) updateUserDto: UpdateUserDto) {
    //console.log('controller')
    return this.userService.updatePhoneNumber(updateUserDto, user);
  }
  @UseGuards(AuthGuard())
  @ApiBearerAuth()
  @Patch('updatePrimaryAdress/:id')
  updatePrimaryAdress(@GetUser() user: User, @Param('id') id: string) {
    return this.userService.updatePrimaryAdress(id,user)
  }

  // @Get()
  // findAll() {
  //   return this.userService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.userService.findOne(+id);
  // }


  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.userService.remove(+id);
  // }
}
