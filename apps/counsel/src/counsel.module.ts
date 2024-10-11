import { Module } from '@nestjs/common';
import { CounselController } from './counsel.controller';
import { CounselService } from './counsel.service';

@Module({
  imports: [],
  controllers: [CounselController],
  providers: [CounselService],
})
export class CounselModule {}
