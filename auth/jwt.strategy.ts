import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Strategy, ExtractJwt } from 'passport-jwt'
import { AdminRepository } from "src/admin/admin.repository";
import { UserRepository } from "src/user/user.repository";
import { JwtPayload } from "./payloadInterface/payload";



@Injectable()
export class JwtStartegy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        @InjectRepository(AdminRepository)
        private adminRepository: AdminRepository
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'topSecret51',
        });
    }


    async validate(paylod: JwtPayload) {
        const { username } = paylod;
        const adminResult = await this.adminRepository.findOne({ admin_username: username });
        const userResult = await this.userRepository.findOne({ where: [{ user_email: username }, { user_phone: username }, { user_username: username }] })
        if (adminResult) {
            return adminResult
        } else if (userResult) {
            return userResult
        }
        else {
            throw new UnauthorizedException('Not Found');


        }


        //     console.log(user)
        //     if(!user){
        //         throw new UnauthorizedException('Not Found');
        //     }
        //     else{
        //         return user;
        //     }


    }

}