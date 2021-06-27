import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "src/category/entities/category.entity";
import { ProductUpdate } from "src/order/interface/productinterface";
import { Subcategory } from "src/subcategory/entities/subcategory.entity";
import { DeleteResult, EntityRepository, getRepository, InsertResult, Repository, UpdateResult } from "typeorm";
import { CreateProductDto, PrductImageDto, ProducRatingtDto } from "./dto/create-product.dto";
import { Product } from "./entities/product.entity";
import { ProductViewInterface } from './interface/productview.interface'
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Wishlist } from "src/wishlist/entities/wishlist.entity";
import { GetUser } from 'src/user/dto/get-user-decorator';
import { User } from "src/user/entities/user.entity";
import { ProductRatingByUser } from "./entities/productrate.entity";
import { ProductImages } from "./entities/productimages.entity";
@EntityRepository(Product)
export class ProductRepository extends Repository<Product>{

    async createProduct(productDto: CreateProductDto, file: Express.Multer.File): Promise<Product> {
        const { product_name, product_rate, subcategory_id, product_stock, product_description } = productDto;
        try {
            const product = new Product()
            product.product_name = product_name;
            product.product_rate = product_rate;
            product.subcategory_id = subcategory_id;
            product.product_stock = product_stock;
            product.product_description = product_description;

            product.product_image = file.path;
            const insert = await product.save()
            if (insert)
                return insert
            else
                throw new InternalServerErrorException("Data Not Inserted")
            // const insert =await this.createQueryBuilder().insert().into(Product).values({product_name:product_name,product_rate:product_rate,subcategory_id:subcategory_id,product_stock:product_stock}).execute();
        } catch (err) {
            if (err.code === "23505") {
                throw new ConflictException('Product is already Exist !!!')
            }
            else {
                console.log(err)
                throw new InternalServerErrorException();
            }
        }
    }





    async updateProduct(productDto: CreateProductDto, id: string): Promise<any> {
        const { product_name, product_rate, subcategory_id, product_stock } = productDto;
        try {
            const getData = await this.findOne(id)
            if (getData) {
                getData.product_name = product_name;
                getData.product_rate = product_rate;
                getData.subcategory_id = subcategory_id;
                getData.product_stock = product_stock;
                if (await getData.save()) {
                    return { Result: "Data Updated", id: id, status: true }
                } else {
                    return { Result: "Data Not Updated", id: id, status: false }
                }
            }
        } catch (err) {
            if (err.code === "23505") {
                throw new ConflictException('Product is already Exist !!!')
            }
            else {
                console.log(err)
                throw new InternalServerErrorException();
            }
        }


        //     const update = await this.createQueryBuilder().update(Product)
        //     .set({product_name:product_name,product_rate:product_rate,subcategory_id:subcategory_id,product_stock:product_stock})
        // .where('product_id=:id',{id:id}).execute();

    }



    async deleteProduct(id: string): Promise<DeleteResult> {
        try {
            const deleteProduct = await this.createQueryBuilder().delete().where('product_id=:id', { id: id }).execute()
            console.log(deleteProduct)
            if (deleteProduct.affected) {
                return deleteProduct
            }
        } catch (err) {
            console.log(err)
        }
    }



    async productView(id: string, userAuth: User)
    // :Promise<ProductViewInterface>
    {

        // // for poduct details view
        // try{
        //     const select = await this.createQueryBuilder('product')
        //     .leftJoinAndSelect(Subcategory,'subcat','subcat.subcategory_id=product.subcategory_id')
        //     .leftJoinAndSelect(Category,'cat','cat.category_id=subcat.category_id')
        //     .where('product.subcategory_id=:id',{id:id})
        //     .andWhere('product.product_status=true').getRawMany()
        //     //console.log(select)
        //     return select;
        // }catch(err)
        // {console.log(err)
        // }





        //Product Simple View:aslo check the product in wishlist 

        const productList = await this.find({ where: { subcategory_id: id, product_status: true } })
        let i = 0;

        console.group(productList)
        const productListArray = new Array<ProductViewInterface>();
        // console.log(userAuth.user_id)
        await Promise.all(productList.map(async pdct => {
            let isWish = false

            //  console.log(pdct.product_id)
            //checcking the product in wishlist
            const isuserWish = await getRepository(Wishlist).findOne({ where: { product_id: pdct.product_id, user_id: userAuth.user_id } })
            //console.log(isuserWish)
            if (isuserWish) {
                isWish = isuserWish.wishlist_status
                //console.log(isuserWish)
            }
            let productListView: ProductViewInterface = { product_rating: pdct.product_rating, product_id: pdct.product_id, product_image: pdct.product_image, product_name: pdct.product_name, product_rate: pdct.product_rate, isInWishlist: isWish }
            productListArray.push(productListView)
            i++;
        }))
        return productListArray
    }


    //Update product qty after purchase

    async updateProductQty(productUpdateArray: ProductUpdate[]) {

        await Promise.all(productUpdateArray.map(async product => {
            try {
                // const select = await this.createQueryBuilder().select().where('product_id=:id',{id:product.product_id}).execute()
                const select = await this.createQueryBuilder().where('product_id=:id', { id: product.product_id }).getMany();
                const stock = select[0].product_stock - product.product_qty
                console.log(stock)

                //update product status if stock is less than 3
                if (select[0].product_stock <= 3) {
                    try {
                        const update = await getRepository(Product).createQueryBuilder()
                            .update().set({ product_status: false })
                            .where('product_id=:id', { id: product.product_id }).execute()
                        console.log(update)
                    } catch (err) {
                        console.log(err)
                    }
                }


                const update = await getRepository(Product).createQueryBuilder()
                    .update().set({ product_stock: stock })
                    .where('product_id=:id', { id: product.product_id }).execute()
                console.log(update)
            } catch (err) {
                console.log(err)
            }
        })
        );

    }


    //User rating
    async ProductRating(product_id: string, user_id: User, producratetDto: ProducRatingtDto) {
        const { rating_count } = producratetDto;
        //Updating table product 
        const findProduct = await this.findOne({ where: { product_id } });
        console.log(findProduct)
        if (findProduct) {
            const totalUserRated = findProduct.product_ratingusercount + 1;//Total user rated this particular product
            const totalProductRate = ((findProduct.product_rating) * findProduct.product_ratingusercount) + rating_count;//Total rate for this particular Product
            console.log("totalUserRated =" + totalUserRated)
            console.log("totalProductRate =" + totalProductRate)

            findProduct.product_ratingusercount = totalUserRated;
            findProduct.product_rating = Math.round(totalProductRate / totalUserRated)
        }
        try {
            await findProduct.save();

        } catch (err) {
            console.log(err)
        }
        //insertion to tbl_rating
        const rating = new ProductRatingByUser()

        rating.product_id = product_id as any;
        rating.user_id = user_id as any;
        rating.rating_count = rating_count

        try {
            await rating.save()
        } catch (err) {
            console.log(err)
        }
        return { status: true, message: "Done" }


    }



    //User All Product View
    async allProductView(): Promise<Product[]> {
        const productList = await this.createQueryBuilder().select().orderBy('Random()').getMany()
        // console.log(productList)
        try {
            return productList;
        } catch (err) {
            console.log(err)
        }
    }






    // ARRAY OF PRODUCT FILE


    async multiProductUpload(id: string, files: any) {
        //
        //files.map(file=>{console.log(files);console.log(i);i++;})
        // const { product_image_image, product_id } = prductImageDto;

        await Promise.all(files.map(async file => {
            const product_image = new ProductImages();

            product_image.product_id = id as any;

            product_image.product_image_image = file.filename;
            // console.log(file.path)
            await product_image.save()
        }))

    }
}