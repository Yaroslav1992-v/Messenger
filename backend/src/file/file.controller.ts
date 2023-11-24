import { Controller, Delete, Param } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('file')
export class FileController {
  constructor(private readonly fileServive: FileService) {}
  @Delete('deleteByUrl/:url')
  async deleteImage(@Param('url') url: string) {
    return await this.fileServive.deleteImage(url);
  }
}
