import { ConflictException, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { Category } from "src/category/entities/category.entity";
import { EntityRepository, InsertResult, Repository } from "typeorm"
import { CreateSubcategoryDto } from "./dto/create-subcategory.dto"
import { Subcategory } from "./entities/subcategory.entity"
@EntityRepository(Subcategory)
export class SubCategoryRepository extends Repository<Subcategory>
{
    async createSubCategory(createSubcategoryDto:CreateSubcategoryDto,file: Express.Multer.File) :Promise<Subcategory>
    {
        const {subcategory_name,category_id} =createSubcategoryDto;

        const subCategory = new Subcategory();

        subCategory.subcategory_name = subcategory_name;

        subCategory.category_id = category_id;

        subCategory.subcategory_image = file.path;
        
        try{
         return  await subCategory.save();
            // const insert = await this.createQueryBuilder().insert().into(Subcategory).values({subcategory_name:subcategory_name,category_id:category_id}).execute();
        }catch(err){
        if(err.code==="23505"){
            throw new ConflictException('SubCategory is already Exist !!!')
        }
        else{
            throw new InternalServerErrorException();
        }
    }
        
        // else{
        //     console.log('data Not Inserted')
        // }
    }






    async updateSubCategory(createSubcategoryDto:CreateSubcategoryDto,id:string):Promise<any>{
        console.log('Repository')
        const {subcategory_name,category_id} = createSubcategoryDto;
        try{
            console.log(id)
            const getData = await this.findOne(id)
            if(getData){
                const subCategory =new Subcategory();
                getData.category_id = category_id;
                getData.subcategory_name = subcategory_name;
                
                    //console.log('find')
                   if(await getData.save()) {
                       //console.log('find')
                       return {Result:"Data Updated" ,id:id,status:true}
                   }else{
                    return {Result:"Data Not Updated" ,id:0,status:false}
                   }
                

            }else{
                return {Result:"Data Not Found" ,id:0 ,status:false}
            }

        }catch(err){
            if(err.code==="23505"){
                throw new ConflictException('Sub Category is already Exist !!!')
            }
            else{
                console.log(err)
                throw new InternalServerErrorException('Exc');
            }
            // throw new InternalServerErrorException();
        }
        }

        //     const update =await this.createQueryBuilder().update(Subcategory)
        // .set({subcategory_name:subcategory_name,category_id:category_id})
        // .where("subcategory_id=:id",{id:id}).execute();
        // console.log(update)

       

        
    






    async deleteSubCategory(id:string){
        try{
            const deleteSubcategory = await this.createQueryBuilder().delete().
            from(Subcategory).where('subcategory_id=:id',{id:id}).execute();
            if(deleteSubcategory.affected){
                console.log('Data delete')
            }
            else{
                console.log('Data not delete')
            }
            console.log(deleteSubcategory);
        }catch(err){
            console.log(err)
        }
    }


 
    async subCategoryView(id:string){
        try{
            const select = await this.createQueryBuilder('subcat').leftJoinAndSelect('subcat.category_id','category').where({category_id:id}).getMany();
            return select;
            console.log(select)
        }
        catch(err)
        {
            console.log(err)
        }
    }


    

}