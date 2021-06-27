import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { exception } from "node:console";
import { CommonFunction } from "src/common/commonfunction";
import { DeleteResult, DeleteWriteOpResultObject, EntityRepository, getRepository, Repository, UpdateResult } from "typeorm";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { Category } from "./entities/category.entity";
@EntityRepository(Category)
export class CategoryRepository extends Repository<Category>{
    async createCategory(categoryDto: CreateCategoryDto, file: Express.Multer.File): Promise<Category> {
        console.log('Repository')
        const { category_name } = categoryDto;

        const category = new Category();

        category.category_name = category_name;
        category.category_image = file.path;
        // category.category_imagePath = file.path;
        console.log(await category.save())
        try {

            const result = await category.save()

            return result;
        }
        catch (err) {
            console.log(err)
            if (err.code === "23505") {
                throw new ConflictException('Category is already Exist !!!')
            }
            else {

                throw new InternalServerErrorException();
            }

            console.log(err)
        }
    }








    async updateCategory(categoryDto: UpdateCategoryDto, id: string, file: Express.Multer.File): Promise<any> {

        try{
            const {category_name} =categoryDto;
            const findID = await this.findOne(id)
            // const update = await findID.save();
            console.log(findID)
            if(findID){
                findID.category_name = category_name;
                if(file){
                    findID.category_image = file.path;
                    const file_path = findID.category_image;
                const commonFunction = new CommonFunction()
                await commonFunction.deleteFile(file_path)
                }
                
            await findID.save()
            }
            // const update = await getRepository(Category).save(categoryDto)
        }catch(err){
            console.log(err)
        }
       
        







        // const { category_name } = categoryDto;
        //this.save(categoryDto);

        // try {
        //     //console.log() 

        //     const findData = await this.findOne(id);
        //     // console.log(findData)   
        //     if (findData) {
        //         findData.category_name = category_name;

        //         if (file) {
        //             await this.deleteFile(findData.category_imagePath)
        //             findData.category_imagePath = file.path;
        //             findData.category_image = file.path;
        //             //calling delete Fn

        //         }

        //         const result = await findData.up()
        //         return result;
        //         // return {id:id,category_name:category_name}
        //     }
        //     else {
        //         console.log("Data Not Found")
        //         return { Error: 'Data Not Found' }
        //     }
        // }
        // catch (err) {
        //     console.log(err.code)
        //     if (err.code === "23505") {
        //         throw new ConflictException('Category is already Exist !!!')
        //     }
        //     else {
        //         throw new InternalServerErrorException('Exc');
        //     }
        // }
    }




    //    const affect = await this.createQueryBuilder().update(Category).
    //    set({category_name:category_name}).
    //    where('category_id=:id',{id:id}).execute()
    //    if(affect){
    //        return affect;
    //    }








    async deletecategory(id: string): Promise<DeleteResult> {

        try {
            const findData = await this.findOne({ where: { category_id: id } })
            console.log(" id :" + findData)
            if (findData) {
                const file_path = findData.category_image;
                // console.log('Path' + file_path)

                //Delete File Function calling
                const commonFunction = new CommonFunction()
                await commonFunction.deleteFile(file_path)

                // await this.deleteFile(file_path)

                const deleteCategory = await this.createQueryBuilder().delete().where('category_id=:id', { id: id }).execute()
                return deleteCategory;
            }
        } catch (err) {
            throw new InternalServerErrorException()
        }

    }






    async categoryView(): Promise<Category[]> {
        try {
            const select = await this.createQueryBuilder().getMany()
            return select;

            // const select = await this.createQueryBuilder().select('cat').from(Category,'cat').execute()
            console.log(select);
        } catch (err) { console.log(err) }
    }


   

}
