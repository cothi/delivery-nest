import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserMapper, UserMapper } from '../mapper/user.mapper';
import { CreateUserDto } from '../../presentation/dto/req/create-user.dto';
import { User } from '../../domain/model/user.model';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createAccount(user: CreateUserDto): Promise<User> {
    const userEntity = CreateUserMapper.toPersistence(user);
    const createUser = await this.prismaService.user.create({
      data: userEntity,
    });
    return CreateUserMapper.toDomain(createUser);
  }

  async findAccountByEmail(email: string): Promise<User | null> {
    const getUser = await this.prismaService.user.findUnique({
      where: { email },
    });
    if (!getUser) return null;
    return UserMapper.toDomain(getUser);
  }
  async findAccountByUserId(userId: string): Promise<User | null> {
    const getUser = await this.prismaService.user.findUnique({
      where: { id: userId },
    });
    return UserMapper.toDomain(getUser);
  }

  async deleteAccount(userId: string): Promise<void> {
    await this.prismaService.user.delete({
      where: { id: userId },
    });
  }
}
