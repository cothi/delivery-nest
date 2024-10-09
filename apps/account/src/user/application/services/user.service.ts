import { Injectable } from '@nestjs/common';

import { ErrorCode, errorFactory } from '@libs/exception';
import { UserRepository } from '@account/user/infrastructure/persistence/user.repository';
import { KakaoAuth } from '@account/user/infrastructure/kakao/kakao.auth';
import { CreateUserDto } from '@account/user/presentation/dto/req/create-user.dto';
import { User } from '@account/user/domain/model/user.model';
import { LoginUserQuery } from '@account/user/application/queries/login-user.query';
@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly kakaoAuth: KakaoAuth,
  ) {}
  async signUp(createUser: CreateUserDto): Promise<User> {
    const user = await this.userRepository.findAccountByEmail(createUser.email);
    if (user) {
      throw errorFactory(ErrorCode.SIGN_EMAIL_CONFLICTED);
    }
    return await this.userRepository.createAccount(createUser);
  }
  async login(query: LoginUserQuery): Promise<User> {
    const user = await this.userRepository.findAccountByEmail(query.email);
    if (!user) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    if (query.password != user.password) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    return user;
  }

  async deleteAccount(userId: string): Promise<void> {
    const user = await this.userRepository.findAccountByUserId(userId);
    if (!user) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
    return await this.userRepository.deleteAccount(userId);
  }

  async getKakaoAuthUrl(): Promise<string> {
    return this.kakaoAuth.getAuthorizationUrl();
  }
  async kakaoLogin(code: string): Promise<User> {
    const kakaoToken = await this.kakaoAuth.getToken(code);
    const kakaoUser = await this.kakaoAuth.getUser(kakaoToken.access_token);
    console.log(kakaoUser);
    let user = await this.userRepository.findAccountByUserId(kakaoUser.id);
    if (!user) {
      user = await this.userRepository.createAccountWithId({
        id: kakaoUser.id,
        email: kakaoUser.kakao_account.email,
        nickname: kakaoUser.properties.nickname,
      });
    }
    return user;
  }
}
