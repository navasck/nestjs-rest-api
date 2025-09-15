import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: ['http://localhost:4200', 'https://your-frontend-domain.com'],
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true,
  });
  app.use(helmet());
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

// How Helmet Works
// Helmet is a middleware library that is a wrapper around several smaller middleware functions, each setting a specific HTTP header.By default, helmet() enables all of its core middlewares, which include:

// helmet.contentSecurityPolicy(): Mitigates Cross - Site Scripting(XSS) and other attacks by preventing browsers from loading unauthorized content.

//   helmet.crossOriginEmbedderPolicy(): Prevents a document from loading cross - origin resources that don't explicitly grant permission.

// helmet.crossOriginOpenerPolicy(): Isolates your document from potentially malicious pop - ups.

//   helmet.crossOriginResourcePolicy(): Prevents your resources from being loaded by other domains.

//     helmet.dnsPrefetchControl(): Controls browser DNS prefetching behavior to improve privacy.

//       helmet.frameguard(): Prevents Clickjacking by setting the X - Frame - Options header to DENY by default.

// helmet.hidePoweredBy(): Removes the X - Powered - By header, which can reveal what technology your server is running.

//   helmet.hsts(): (HTTP Strict Transport Security) Forces clients to use HTTPS for a specified duration, preventing man -in -the - middle attacks.

//     helmet.ieNoOpen(): Prevents users from executing downloads in the context of your site.

//       helmet.noSniff(): Prevents browsers from "sniffing" the content type, mitigating vulnerabilities related to mis - declared file types.

//         helmet.originAgentCluster(): A header to opt -in to origin isolation.

//           helmet.permittedCrossDomainPolicies(): Specifies the policy for loading resources across domains.

//             helmet.referrerPolicy(): Controls what referrer information is sent with requests.

//               helmet.xssFilter(): (Deprecated) Adds a small layer of XSS protection in older browsers by setting the X - XSS - Protection header.
