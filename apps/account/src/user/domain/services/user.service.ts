import { Inject, Injectable } from '@nestjs/common';

import { ErrorCode, errorFactory } from '@libs/exception';
import { UserModel } from '@account/user/domain/model/user.model';
import {
  IUserRepository,
  UserRepositorySymbol,
} from '@account/user/infrastructure/interfaces/user-repository.interface';
import { CreateUserDto } from '@account/user/domain/dto/create-user.dto';
import { LoginUserDto } from '@account/user/domain/dto/login-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(UserRepositorySymbol)
    private readonly userRepository: IUserRepository,
  ) {}
  async signUp(dto: CreateUserDto): Promise<UserModel> {
    return await this.userRepository.createUser({
      data: {
        nickname: dto.nickname,
        email: dto.email,
        password: dto.password,
      },
    });
  }
  async validateLogin(query: LoginUserDto): Promise<UserModel> {
    const user = await this.userRepository.findUserUnique({
      where: {
        email: query.email,
      },
    });
    if (query.password != user.password) {
      throw errorFactory(ErrorCode.UNAUTHORIZED);
    }
    return user;
  }

  async deleteAccount(userId: string): Promise<UserModel> {
    return await this.userRepository.deleteUser({
      where: {
        id: userId,
      },
    });
  }

  async validateExistUserId(userId: string): Promise<void> {
    const user = await this.userRepository.findUserUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw errorFactory(ErrorCode.NOT_FOUND);
    }
  }
  async validateCanSignUpUser(email: string): Promise<void> {
    const user = await this.userRepository.findUserUnique({
      where: {
        email,
      },
    });
    if (user) {
      throw errorFactory(ErrorCode.SIGN_EMAIL_CONFLICTED);
    }
  }
}
