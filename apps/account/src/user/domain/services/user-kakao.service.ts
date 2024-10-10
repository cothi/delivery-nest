import { Injectable } from '@nestjs/common';
import { KakaoAuth } from '@account/user/infrastructure/kakao/kakao.auth';
import { UserRepository } from '@account/user/infrastructure/persistence/user.repository';
import { UserModel } from '@account/user/domain/model/user.model';

@Injectable()
export class UserKakaoService {
  constructor(
    private readonly kakaoAuth: KakaoAuth,
    private readonly userRepository: UserRepository,
  ) {}

  async getKakaoAuthUrl(test: boolean): Promise<string> {
    return this.kakaoAuth.getAuthorizationUrl(test);
  }

  async kakaoLogin(code: string): Promise<UserModel> {
    const kakaoToken = await this.kakaoAuth.getToken(code, false);
    const kakaoUser = await this.kakaoAuth.getUser(kakaoToken.access_token);
    const user = await this.userRepository.getKakaoUser(kakaoUser.id);

    if (!user) {
      return await this.userRepository.createAccount({
        email: kakaoUser.email,
        nickname: kakaoUser.properties.nickname,
        OAuthProvider: {
          create: {
            provider: 'KAKAO',
            providerId: kakaoUser.id.toString(),
          },
        },
      });
    }
    return user;
  }
}
