import { ApiProperty } from "@nestjs/swagger";



export class CreateAdminDto {


    admin_id : number;
    
    admin_username : string;

    admin_password :string;

}
