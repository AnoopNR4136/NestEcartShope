import { User } from "src/user/entities/user.entity";
import { EntityRepository, Repository } from "typeorm";
import { CreateWishlistDto } from "./dto/create-wishlist.dto";
import { Wishlist } from "./entities/wishlist.entity";
@EntityRepository(Wishlist)
export class WishlistRepository extends Repository<Wishlist>{
    async updateWishlist(createWishlistDto: CreateWishlistDto, userAuth: User):Promise<{}> {
        const { product_id } = createWishlistDto;
        const userId = userAuth.user_id
        const findWishlist = await this.findOne({ where: [{ product_id: product_id, user_id: userId }] })
        if (findWishlist) {
            findWishlist.wishlist_status = !findWishlist.wishlist_status
            try {
                await findWishlist.save();
                return {id:product_id,status:findWishlist.wishlist_status}
            } catch (err) {
                console.log(err)

            }
        } else {
            const wishlist = new Wishlist();
            wishlist.product_id = product_id
            wishlist.user_id = userId as any;
            wishlist.wishlist_status = true;
            try {
                await wishlist.save()
                return {id:product_id,status:findWishlist.wishlist_status}
            } catch (err) {
                console.log(err)

            }
        }
    }




    async viewUserWishlist(userAuth: User) {

        const userId = userAuth.user_id;
        const list = await this.createQueryBuilder('wish').leftJoinAndSelect('wish.product_id','product')
        .where({ user_id: userId, wishlist_status: true })
        // .leftJoin('','')
        .getMany()
        // const wishlist = await this.find({ where: { user_id: userId, wishlist_status: true } })
        console.log(list)
        return list;

    }

}