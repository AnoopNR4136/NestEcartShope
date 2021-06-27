import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";
import { Category } from "src/category/entities/category.entity";

export class CreateSubcategoryDto {
    @IsNotEmpty()
    @IsString()
    subcategory_name : string;

    @IsNotEmpty()
    category_id : Category;

    @ApiProperty({ type: 'string', format: 'binary' })
    file: any;
}
