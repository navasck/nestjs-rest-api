// src/uploads/uploads.controller.ts

import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';

import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';

@Controller('upload')
export class UploadController {
  // Single File Upload

  @Post('single')
  @UseInterceptors(FileInterceptor('file')) // 'file' is the form field name
  uploadSingle(@UploadedFile() file: Express.Multer.File) {
    return {
      uploadType: 'single',

      file: {
        message: 'Image uploaded successfully!',
        originalName: file.originalname,
        fileName: file.filename,
        path: file.path,
        size: file.size,
      },
    };
  }

  // Multiple Files Upload

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files', 5))
  uploadMultiple(@UploadedFiles() files: Express.Multer.File[]) {
    return {
      uploadType: 'multiple',

      files: files.map((file) => ({
        message: 'Image uploaded successfully!',
        originalName: file.originalname,
        fileName: file.filename,
        path: file.path,
        size: file.size,
      })),
    };
  }
}

// NestJS provides a high - level abstraction with decorators like @UseInterceptors(FileInterceptor('...')) and @UploadedFile().These decorators simplify the file upload process, so you don't have to manually interact with multer's API.

// Interceptors in NestJS are a special type of middleware that can intercept and modify requests and responses in your application.They are inspired by the aspect - oriented programming(AOP) paradigm, allowing you to inject logic before or after a method's execution.

// Key Uses of Interceptors
// Interceptors are useful for a variety of tasks, including:

// Transforming the response: Modifying the outgoing data format, for example, by wrapping the response in a standardized JSON object.

//   Logging: Logging details about incoming requests and outgoing responses for debugging or monitoring.

// Error handling: Catching and handling exceptions that occur during a request.

//   Caching: Implementing a caching layer to improve performance by returning a cached response instead of processing the request.

// Authentication and authorization: Checking user permissions before allowing access to a resource.

// @UseInterceptors()
// The @UseInterceptors() decorator is how you apply an interceptor to a controller, a specific route handler, or a global context.It's a key part of the NestJS framework that ties an interceptor class to the execution flow.
