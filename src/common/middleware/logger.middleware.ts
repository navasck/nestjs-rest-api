import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    console.log('Request ....', new Date().toDateString());
    next();
  }
}
// This middleware logs the current date and time for each incoming request to the console.

// What the use Method Does
// The use method receives the Express request(req), response(res), and a next function. The next() function is crucial; it passes control to the next middleware or the route handler.Without calling next(), the request would hang, and the response would never be sent.
