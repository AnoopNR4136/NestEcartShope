import { Module } from '@nestjs/common';
import { FileuploadsService } from './fileuploads.service';
import { FileuploadsController } from './fileuploads.controller';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    // ServeStaticModule.forRoot({
    //   rootPath: join(__dirname,'../','../', 'upload')
    // })
  ],
  controllers: [FileuploadsController],
  providers: [FileuploadsService]
})
export class FileuploadsModule {}
