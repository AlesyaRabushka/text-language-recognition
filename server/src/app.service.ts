import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {

  async startProcessing(files: Array<Express.Multer.File>){
    try {

      const arr = [
        {name:"название", result:"такой-то язык такое-то сходство", text:"текст файла"},
        {name:"название", result:"такой-то язык такое-то сходство", text:"текст файла"}
      ];

      return arr;
    } catch (error) {
      console.log('[Server] error', error);

      throw error;
    }
  }

  async generatePdfData(resultData: Array<any>){
    try {
      let resultStr = '';
      for (let i = 0; i < resultData.length; i++){
        resultStr += `${resultData[i].name}\n${resultData[i].result}\n\n`;
      }

      return resultStr;
    } catch (error) {
      console.log('[Service] generatePdfData error', error);

      throw error;
    }
  }
}
