
import { IsEmail, IsMobilePhone, IsNotEmpty, IsPhoneNumber, IsString, Matches, matches, MaxLength, MinLength } from "class-validator";
import { User } from "../entities/user.entity";

export class CreateUserDto {

    // @IsString()
    // @IsNotEmpty()
    // user_name :string;

    @IsNotEmpty()
    @IsEmail()
    user_email :string;

    // @IsNotEmpty()
    // //@IsMobilePhone()
    // user_phone :string;

    // @IsNotEmpty()
    // @MinLength(5)
    // user_username :string;

    @IsNotEmpty()
    @MinLength(5)
    user_password :string;

    
    user_pwd :string;

    user_salt :string;
}




export class CreateAdressDto{
    //adress_id : number 
    @IsNotEmpty()
    adress_name: string;
     
    @IsNotEmpty()
    adress_adress :string;


    @IsNotEmpty()
    @MaxLength(10)
    adress_phone :string;

    adress_alt_phone : string;

    @IsNotEmpty()
    adress_state :string;


    @IsNotEmpty()
    adress_city :string;

    @IsNotEmpty()
    @MaxLength(6)
    adress_pin :string;

    
}
