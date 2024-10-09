import { Injectable } from '@nestjs/common';
import { PrismaService } from '@libs/database';
import { Prisma } from '@prisma/client';
import { User } from '@account/user/domain/model/user.model';
import {
  CreateUserMapper,
  UserMapper,
} from '@account/user/infrastructure/mapper/user.mapper';

@Injectable()
export class UserRepository {
  constructor(private readonly prisma: PrismaService) {}
  async createAccount(data: Prisma.UserCreateInput): Promise<User> {
    const createUser = await this.prisma.user.create({ data });
    return CreateUserMapper.toDomain(createUser);
  }

  async createAccountWithId(data: Prisma.UserCreateInput): Promise<User> {
    const createUser = await this.prisma.user.create({
      data,
    });
    return CreateUserMapper.toDomain(createUser);
  }

  async findAccountByEmail(email: string): Promise<User | null> {
    const getUser = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!getUser) {
      return null;
    }
    return UserMapper.toDomain(getUser);
  }
  async findAccountByUserId(userId: string): Promise<User | null> {
    const getUser = await this.prisma.user.findUnique({
      where: { id: userId.toString() },
    });
    if (!getUser) {
      return null;
    }
    return UserMapper.toDomain(getUser);
  }

  async deleteAccount(userId: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id: userId },
    });
  }
}
