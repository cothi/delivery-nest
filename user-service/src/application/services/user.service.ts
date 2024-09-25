import { HttpStatus, Injectable } from '@nestjs/common';
import { LoginInput } from '../../presentation/dto/req/login.dto';
import { UserRepository } from '../../infrastructure/persistence/user.repository';
import { CreateUserDto } from '../../presentation/dto/req/create-user.dto';
import { User } from '../../domain/model/user.model';
import { errorFactory } from '../../utils/exception/error-factory';
import { ErrorCode } from '../../utils/exception/enums/error-code.enum';
import { LoginUserQuery } from '../queries/login-user.query';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
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

  async getKakaoAuthUrl(): Promise<string> {}

  async kakaoAuth(code: string): Promise<string> {}
}
