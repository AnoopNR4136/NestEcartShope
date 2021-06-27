import { PartialType } from '@nestjs/swagger';
import { CreateCategoryDto } from './create-category.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class UpdateCategoryDto extends PartialType(CreateCategoryDto) {
    // @IsString()
    // @ApiProperty({required:false})
    // category_name : string;
    
    // @ApiProperty({ type: 'string', format: 'binary',required:false })
    // fileCategory: any;
}
