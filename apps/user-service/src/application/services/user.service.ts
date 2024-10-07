import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginInput } from '../../presentation/dto/req/login.dto';
import { UserRepository } from '../../infrastructure/persistence/user.repository';
import { CreateUserDto } from '../../presentation/dto/req/create-user.dto';
import { User } from '../../domain/model/user.model';
import { errorFactory } from '../../utils/exception/error-factory';
import { ErrorCode } from '../../utils/exception/enums/error-code.enum';
import { LoginUserQuery } from '../queries/login-user.query';
import { KakaoAuth } from '../../infrastructure/kakao/kakao.auth';

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
