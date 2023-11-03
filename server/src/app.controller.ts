import { Body, Controller, Get, HttpStatus, Post, Req, Res, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';
import { AnyFilesInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/file-processing')
  @UseInterceptors(AnyFilesInterceptor())
  async startProcessing(@UploadedFiles() files: Array<Express.Multer.File>,  @Res() res: Response){
    try {

      const result = await this.appService.startProcessing(files);

      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      console.log('[Controller] error', error);

      throw error;
    }
  }
}
