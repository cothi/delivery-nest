import { Module } from '@nestjs/common';
import { KakaoAuth } from './kakao.auth';

@Module({
  providers: [KakaoAuth],
  exports: [KakaoAuth],
})
export class KakaoModule {}
