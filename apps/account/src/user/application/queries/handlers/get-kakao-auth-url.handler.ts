import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetKakaoAuthUrlQuery } from '@account/user/application/queries/get-kakao-auth-url.query';
import { UserKakaoService } from '@account/user/domain/services/user-kakao.service';
import { KakaoAuthObj } from '@account/user/presentation/dto/res/kakao-auth-url.object';

@Injectable()
@QueryHandler(GetKakaoAuthUrlQuery)
export class GetKakaoAuthUrlHandler
  implements IQueryHandler<GetKakaoAuthUrlQuery>
{
  constructor(private readonly kakaoService: UserKakaoService) {}
  async execute(): Promise<KakaoAuthObj> {
    const url = await this.kakaoService.getKakaoAuthUrl(true);
    return { url };
  }
}
