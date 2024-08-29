import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserMapper } from '../mapper/user.mapper';
import { CreateUserDto } from '../../presentation/dto/req/create-user.dto';
import { User } from '../../domain/model/user.model';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async createAccount(user: CreateUserDto): Promise<User> {
    //return await this.prismaService.user.create( );
    const userEntity = CreateUserMapper.toPersistence(user);
    const getUser = await this.prismaService.user.create({
      data: userEntity,
    });
    return CreateUserMapper.toDomain(getUser);
  }
}
