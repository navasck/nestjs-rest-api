import { Injectable } from '@nestjs/common';

interface HelloMessage {
  id: number;
  message: string;
}

@Injectable()
export class AppService {
  getHello(): HelloMessage[] {
    return [
      { id: 1, message: 'Hello Navas CK!' },
      { id: 2, message: 'This is the second message.' },
      { id: 3, message: 'This is the third message.' },
      { id: 4, message: 'This is the fourth message.' },
    ];
  }
}
