import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CacheModule } from '@nestjs/cache-manager';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from './prisma/prisma.service';
import { EmployeesModule } from './employees/employees.module';
import { PostsModule } from './post/post.module';
import { UploadModule } from './uploads/uploads.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { UploadController } from './uploads/uploads.controller';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl: 5000, // milliseconds
      isGlobal: true,
    }),
    ProductsModule,
    UsersModule,
    OrdersModule,
    ThrottlerModule.forRoot([
      {
        name: 'short',
        ttl: 1000,
        limit: 3,
      },
      {
        name: 'long',
        ttl: 60000,
        limit: 100,
      },
    ]),
    MyLoggerModule,
    EmployeesModule,
    PostsModule,
    UploadModule,
  ], // Import the new Modules
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    // consumer.apply(LoggerMiddleware).forRoutes('songs'); // option no 1
    // consumer
    //   .apply(LoggerMiddleware)
    //   .forRoutes({ path: 'songs', method: RequestMethod.POST }); //option no 2

    consumer.apply(LoggerMiddleware).forRoutes(UploadController); //option no 3
  }
}

// Using @nestjs/config is a critical step in making your application ready for different environments (development, testing, production) without changing the underlying code.

// The @nestjs/throttler package is a NestJS module that provides a rate-limiting guard to control the number of requests a client can make to your API within a specific timeframe. 🚦 This helps protect your application from brute-force attacks, denial-of-service (DoS) attacks, and general misuse by malicious actors or bots.
