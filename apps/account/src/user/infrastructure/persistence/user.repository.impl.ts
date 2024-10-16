import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import { Prisma } from '@prisma/client';
import { UserModel } from '@account/user/domain/model/user.model';
import { UserMapper } from '@account/user/infrastructure/mapper/user.mapper';
import { IUserRepository } from '@account/user/domain/interfaces/user-repository.interface';

@Injectable()
export class UserRepositoryImpl implements IUserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(args: Prisma.UsersCreateArgs): Promise<UserModel> {
    const createUser = await this.prisma.users.create(args);
    return UserMapper.toDomain(createUser);
  }

  async findUserUnique(
    args: Prisma.UsersFindUniqueArgs,
  ): Promise<UserModel | null> {
    const findUser = await this.prisma.users.findUnique(args);
    if (!findUser) {
      return null;
    }
    return UserMapper.toDomain(findUser);
  }

  async deleteUser(args: Prisma.UsersDeleteArgs): Promise<UserModel> {
    const deleteUser = await this.prisma.users.delete(args);
    return UserMapper.toDomain(deleteUser);
  }

  async findUserFirst(args: Prisma.UsersFindFirstArgs): Promise<UserModel> {
    const findUser = await this.prisma.users.findFirst(args);
    return UserMapper.toDomain(findUser);
  }
}
