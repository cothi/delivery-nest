import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetKakaoAuthUrlQuery } from '../get-kakao-auth-url.query';

@Injectable()
@QueryHandler(GetKakaoAuthUrlQuery)
export class GetKakaoAuthUrlHandler implements IQueryHandler<GetKakaoAuthUrlQuery> {
  constructor() {}
  async execute(cmd: GetKakaoAuthUrlQuery): Promise<Boolean> {
    return true;
  }
}
