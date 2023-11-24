import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v2 } from 'cloudinary';
@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService) {
    v2.config({
      cloud_name: configService.get('CLOUD_NAME'),
      api_key: configService.get('CLOUD_KEY'),
      api_secret: configService.get('CLOUD_SECRET'),
    });
  }
  async deleteImage(url: string) {
    try {
      await v2.uploader.destroy(url);
      return {
        message: `Image with ID ${url} has been deleted from Cloudinary.`,
      };
    } catch (err) {
      console.error(err);
      throw new Error(`Failed to delete image with ID ${url}.`);
    }
  }
}
