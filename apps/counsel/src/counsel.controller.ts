import { Controller, Get } from '@nestjs/common';
import { CounselService } from './counsel.service';

@Controller()
export class CounselController {
  constructor(private readonly counselService: CounselService) {}

  @Get()
  getHello(): string {
    return this.counselService.getHello();
  }
}
