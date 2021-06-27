import { EntityRepository, getRepository, Repository } from "typeorm"
import { CreateAdressDto, CreateUserDto } from "./dto/create-user.dto";
import { AddAdress, User } from "./entities/user.entity";
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt'
import { CreateAuthDto } from "src/auth/dto/create-auth.dto";
import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { UpdateUserDto } from "./dto/update-user.dto";

@EntityRepository(User)
export class UserRepository extends Repository<User>{

    async createUser(createUserDto: CreateUserDto): Promise<{}> {
        const { user_email, user_password, user_pwd, user_salt } = createUserDto;

        //const uuid= uuidv4();
        try {
            const user = new User()

            user.user_id = uuidv4();
            user.user_name = uuidv4();
            user.user_phone = uuidv4();
            user.user_username = uuidv4();

            user.user_email = user_email;



            const salt = await bcrypt.genSalt();

            user.user_salt = salt;

            const hasPassword = await bcrypt.hash(user_password, salt)

            user.user_password = hasPassword;

            user.user_pwd = user_password;



            const registration = await user.save();
            return { id: registration.user_id };
        } catch (error) {
            if (error.code === "23505") {
                throw new ConflictException('Email  is already Exist !!!')
            }
            else {
                console.log(error)
                throw new InternalServerErrorException();
            }

        }
    }

    async loginAuth(createAuthDto: CreateAuthDto, type: string) {
        //const user =new User();
        // console.log('user repository')
        // const {username , password } = createAuthDto;
        // if(type=="phone")
        // { 
        //     console.log("Phone")
        //    const findUser= await this.findOne({where :{user_phone:username}})

        //    if((findUser)&&(await findUser.checkPassword(password)))
        //    {
        //     console.log('Loged Phone')
        //    }
        // }
        // else if(type=="email")
        // {
        //     console.log("Email")
        //     const user= await this.findOne({where :{user_email:username}})
        //      console.log(user)
        //    if((user)&&(await user.checkPassword(password)))
        //    {
        //     console.log('Loged Email')
        //    }
        // }
    }



    async updatePhoneNumber(updateUserDto: UpdateUserDto, userAuth: User): Promise<{}> {
        console.log('rep')
        const { user_phone } = updateUserDto;

        try {
            const findUser = await this.findOne({ where: { user_id: userAuth.user_id } })
            findUser.user_phone = user_phone;
            (await findUser.save())
            return { status: true }
        } catch (error) {
            if (error.code === "23505") {
                throw new ConflictException('Phonenuber is already Exist !!!')
            }
            else {

                console.log(error)

                throw new InternalServerErrorException();

            }

        }
    }

    //adding more than one adress to  a user 
    async addAdress(createAdressDto: CreateAdressDto, user: User) {

        const { adress_phone, adress_name, adress_city, adress_alt_phone, adress_pin, adress_state, adress_adress } = createAdressDto;

        const adress = new AddAdress();

        adress.adress_name = adress_name;
        adress.adress_adress = adress_adress;
        adress.adress_alt_phone = adress_alt_phone;
        adress.adress_city = adress_city;
        adress.adress_phone = adress_phone;
        adress.adress_pin = adress_pin;
        adress.adress_state = adress_state;
        adress.user_id = user.user_id as any;

        try {
            const result = await adress.save()
            return { status: true, message: "Adress Added", id: result.adress_id }
            //    console.log(await adress.save())
        } catch (err) {
            console.log(err)

        }
    }

    async updatePrimaryAdress(id: string, user: User) {
        try {
            const findAdress = await getRepository(AddAdress).findOne({ where: { adress_id: id } })
            //console.log(findAdress)
            if (findAdress) {
                findAdress.adress_status = true;
                const result = await findAdress.save()
            }
        } catch (err) {
            console.log(err)
            return { result: false, message: "Primary Address Updation Failed..." }
        }

    }
}