import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileuploadsService } from './fileuploads.service';
import { CreateFileuploadDto } from './dto/create-fileupload.dto';
import { UpdateFileuploadDto } from './dto/update-fileupload.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { SimpleConsoleLogger } from 'typeorm';





@Controller('fileuploads')
export class FileuploadsController {
  constructor(private readonly fileuploadsService: FileuploadsService) {}

  // @Post()
  // @UseInterceptors(@FileInterceptor('image',{dest :"./uploads"}))
  // uploadFile(){}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file',{storage:diskStorage({
    destination : "./upload",

    filename: (req, file, cb) => {
      const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
      return cb(null, `${randomName}${extname(file.originalname)}`)}


  
  })}))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
   // files.filename=
    // const extension = (files.originalname).split(".")
    
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    console.log(response)
    // console.log(extension[extension.length-1]);
    // files.filename=files.filename+extension;
    

  }
  


  // @Post()
  // create(@Body() createFileuploadDto: CreateFileuploadDto) {
  //   return this.fileuploadsService.create(createFileuploadDto);
  // }

  
  @Get('FileView/:fileId')
  async serveAvatar(@Param('fileId') fileId, @Res() res): Promise<any> {
    console.log(__dirname);
    res.sendFile(fileId, { root: 'upload'});
  }

  // @Get()
  // findAll() {
  //   return this.fileuploadsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.fileuploadsService.findOne(+id);
  // }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFileuploadDto: UpdateFileuploadDto) {
    return this.fileuploadsService.update(+id, updateFileuploadDto);
  }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.fileuploadsService.remove(+id);
  // }



  

}
