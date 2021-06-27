import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
@IsString()
@IsNotEmpty()
category_name : string;

@ApiProperty({ type: 'string', format: 'binary' })
category_image: any;

}
