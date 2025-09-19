// src/uploads/uploads.module.ts

import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { UploadController } from './uploads.controller';
@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          callback(
            null,
            `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`,
          );
        },
      }),
      fileFilter: (req, file, callback) => {
        // Allowed file types
        const allowedTypes = /jpeg|jpg|png|pdf/;
        const ext = extname(file.originalname).toLowerCase();
        if (allowedTypes.test(ext)) {
          callback(null, true);
        } else {
          callback(
            new Error('Only JPEG, PNG, and PDF files are allowed!'),
            false,
          );
        }
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max
    }),
  ],
  controllers: [UploadController],
})
export class UploadModule {}
