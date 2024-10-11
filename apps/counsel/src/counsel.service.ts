import { Injectable } from '@nestjs/common';

@Injectable()
export class CounselService {
  getHello(): string {
    return 'Hello World!';
  }
}
