import { Wishlist } from "src/wishlist/entities/wishlist.entity";

export interface ProductViewInterface{
    product_id : number;

    product_name : string;

    product_rate : number;

    product_image :string;

    product_rating :number;

    isInWishlist :boolean;
}