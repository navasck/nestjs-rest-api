import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { OrdersModule } from './orders/orders.module';
import { MyLoggerModule } from './my-logger/my-logger.module';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { PrismaService } from './prisma/prisma.service';
import { EmployeesModule } from './employees/employees.module';
import { PostsModule } from './post/post.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProductsModule,
    UsersModule,
    AuthModule,
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
export class AppModule {}

// Using @nestjs/config is a critical step in making your application ready for different environments (development, testing, production) without changing the underlying code.

// The @nestjs/throttler package is a NestJS module that provides a rate-limiting guard to control the number of requests a client can make to your API within a specific timeframe. 🚦 This helps protect your application from brute-force attacks, denial-of-service (DoS) attacks, and general misuse by malicious actors or bots.
