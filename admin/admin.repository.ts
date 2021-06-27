import { InternalServerErrorException } from "@nestjs/common";
import { Entity, EntityRepository, Repository } from "typeorm";
import { CreateAdminDto } from "./dto/create-admin.dto";
import { Admin } from "./entities/admin.entity";
@EntityRepository(Admin)
export class AdminRepository extends Repository<Admin>{
    async createAdmin(createAdminDto:CreateAdminDto){
        console.log('CRepositoryontroller')
        const {admin_password,admin_username} = createAdminDto;

        const admin =new Admin();
        admin.admin_username = admin_username;
        admin.admin_password = admin_password;
        try{

             await admin.save()

             return {message:"registration succes" }


        }catch(err){
            console.log(err)
            throw new InternalServerErrorException(err.details)

        }


    }
}