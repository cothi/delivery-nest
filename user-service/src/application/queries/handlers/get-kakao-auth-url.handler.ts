import { Injectable } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetKakaoAuthUrlQuery } from '../get-kakao-auth-url.query';
import { UserService } from '../../services/user.service';
import { KakaoAuthUrlDto } from '../../../presentation/dto/res/kakao-auth-url.dto';

@Injectable()
@QueryHandler(GetKakaoAuthUrlQuery)
export class GetKakaoAuthUrlHandler implements IQueryHandler<GetKakaoAuthUrlQuery> {
  constructor(private readonly userService: UserService) {}
  async execute(cmd: GetKakaoAuthUrlQuery): Promise<KakaoAuthUrlDto> {
    const url = await this.userService.getKakaoAuthUrl();
    return { url };
  }
}
