import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import { Prisma } from '@prisma/client';
import { UserModel } from '@account/user/domain/model/user.model';
import { UserMapper } from '@account/user/infrastructure/mapper/user.mapper';
import { IUserRepository } from '@account/user/infrastructure/interfaces/user-repository.interface';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(args: Prisma.UserCreateArgs): Promise<UserModel> {
    const createUser = await this.prisma.user.create(args);
    return UserMapper.toDomain(createUser);
  }

  async findUserUnique(
    args: Prisma.UserFindUniqueArgs,
  ): Promise<UserModel | null> {
    const findUser = await this.prisma.user.findUnique(args);
    if (!findUser) {
      return null;
    }
    return UserMapper.toDomain(findUser);
  }

  async deleteUser(args: Prisma.UserDeleteArgs): Promise<UserModel> {
    const user = await this.prisma.user.delete(args);
    return UserMapper.toDomain(user);
  }

  async findUserFirst(args: Prisma.UserFindFirstArgs): Promise<UserModel> {
    const user = await this.prisma.user.findFirst(args);
    return UserMapper.toDomain(user);
  }
}
