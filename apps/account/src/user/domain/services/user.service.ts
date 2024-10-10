import { Injectable } from '@nestjs/common';

import { ErrorCode, errorFactory } from '@libs/exception';
import { UserRepository } from '@account/user/infrastructure/persistence/user.repository';
import { CreateUserDto } from '@account/user/presentation/dto/req/create-user.dto';
import { UserModel } from '@account/user/domain/model/user.model';
import { LoginUserQuery } from '@account/user/application/queries/login-user.query';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async signUp(createUser: CreateUserDto): Promise<UserModel> {
    return await this.userRepository.createAccount(createUser);
  }
  async login(query: LoginUserQuery): Promise<UserModel> {
    const user = await this.userRepository.findAccountByEmail(query.email);
    if (query.password != user.password) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    return user;
  }

  async deleteAccount(userId: string): Promise<UserModel> {
    return await this.userRepository.deleteAccount(userId);
  }

  async validateExistUserId(userId: string): Promise<void> {
    const user = await this.userRepository.findAccountByUserId(userId);
    if (!user) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
  }
  async validateCanSignUpUser(email: string): Promise<void> {
    const user = await this.userRepository.findAccountByEmail(email);
    if (user) {
      throw errorFactory(ErrorCode.SIGN_EMAIL_CONFLICTED);
    }
  }
}
