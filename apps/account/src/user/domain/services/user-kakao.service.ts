import { Inject, Injectable } from '@nestjs/common';
import { KakaoAuth } from '@account/user/infrastructure/kakao/kakao.auth';
import { UserModel } from '@account/user/domain/model/user.model';
import {
  IUserRepository,
  UserRepositorySymbol,
} from '@account/user/domain/interfaces/user-repository.interface';
@Injectable()
export class UserKakaoService {
  constructor(
    private readonly kakaoAuth: KakaoAuth,
    @Inject(UserRepositorySymbol)
    private readonly userRepository: IUserRepository,
  ) {}

  async getKakaoAuthUrl(test: boolean): Promise<string> {
    return this.kakaoAuth.getAuthorizationUrl(test);
  }

  async kakaoLogin(code: string): Promise<UserModel> {
    const kakaoToken = await this.kakaoAuth.getToken(code, false);
    const kakaoUser = await this.kakaoAuth.getUser(kakaoToken.access_token);
    const user = await this.userRepository.findUserFirst({
      where: {
        OAuthProvider: {
          some: {
            id: kakaoUser.id,
          },
        },
      },
    });

    if (!user) {
      return await this.userRepository.createUser({
        data: {
          email: kakaoUser.email,
          nickname: kakaoUser.properties.nickname,
          OAuthProvider: {
            create: {
              provider: 'KAKAO',
              providerId: kakaoUser.id.toString(),
            },
          },
        },
      });
    }
    return user;
  }
}
