import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CategoryModule } from './category/category.module';
import { typeOrmConfig } from './config/typeorm.config';
import { SubcategoryModule } from './subcategory/subcategory.module';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { CartModule } from './cart/cart.module';

import { OrderModule } from './order/order.module';
import { AdminModule } from './admin/admin.module';

import { AuthModule } from './auth/auth.module';
import { FileuploadsModule } from './fileuploads/fileuploads.module';
import { WishlistModule } from './wishlist/wishlist.module';

@Module({
  
  imports: [CategoryModule,TypeOrmModule.forRoot(typeOrmConfig), SubcategoryModule, ProductModule, UserModule, CartModule, OrderModule, AdminModule, AuthModule, FileuploadsModule, WishlistModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
