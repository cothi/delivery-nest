import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import { Prisma } from '@prisma/client';
import { UserModel } from '@account/user/domain/model/user.model';
import {
  CreateUserMapper,
  UserMapper,
} from '@account/user/infrastructure/mapper/user.mapper';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createAccount(data: Prisma.UserCreateInput): Promise<UserModel> {
    const createUser = await this.prisma.user.create({ data });
    return CreateUserMapper.toDomain(createUser);
  }

  async createAccountWithId(data: Prisma.UserCreateInput): Promise<UserModel> {
    const createUser = await this.prisma.user.create({
      data,
    });
    return CreateUserMapper.toDomain(createUser);
  }

  async findAccountByEmail(email: string): Promise<UserModel | null> {
    const getUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!getUser) {
      return null;
    }
    return UserMapper.toDomain(getUser);
  }
  async findAccountByUserId(userId: string): Promise<UserModel | null> {
    const getUser = await this.prisma.user.findUnique({
      where: { id: userId.toString() },
    });
    if (!getUser) {
      return null;
    }
    return UserMapper.toDomain(getUser);
  }

  async deleteAccount(userId: string): Promise<UserModel> {
    const user = await this.prisma.user.delete({
      where: { id: userId },
    });
    return UserMapper.toDomain(user);
  }

  async getKakaoUser(kakaoId: string): Promise<UserModel | null> {
    const user = await this.prisma.user.findFirst({
      where: {
        OAuthProvider: {
          some: {
            provider: 'KAKAO',
            providerId: kakaoId,
          },
        },
      },
    });

    if (!user) {
      return null;
    }
    return UserMapper.toDomain(user);
  }
}
