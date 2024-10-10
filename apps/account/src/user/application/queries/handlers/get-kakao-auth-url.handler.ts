import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetKakaoAuthUrlQuery } from '@account/user/application/queries/get-kakao-auth-url.query';
import { UserService } from '@account/user/domain/services/user.service';
import { KakaoAuthUrlDto } from '@account/user/presentation/dto/res/kakao-auth-url.dto';

@Injectable()
@QueryHandler(GetKakaoAuthUrlQuery)
export class GetKakaoAuthUrlHandler
  implements IQueryHandler<GetKakaoAuthUrlQuery>
{
  constructor(private readonly userService: UserService) {}
  async execute(): Promise<KakaoAuthUrlDto> {
    const url = await this.userService.getKakaoAuthUrl();
    return { url };
  }
}
