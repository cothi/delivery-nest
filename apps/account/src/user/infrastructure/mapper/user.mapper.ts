import { CreateUserDto } from '../../presentation/dto/req/create-user.dto';
import { User as UserModel } from '../../domain/model/user.model';
import { Prisma, User } from '@prisma/client';

export class CreateUserMapper {
  static toPersistence(user: CreateUserDto): Prisma.UserCreateInput {
    return {
      ...user,
    };
  }

  static toDomain(user: User): UserModel {
    return {
      email: user.email || '',
      nickname: user.nickname,
      password: user.password || '',
      id: user.id,
    };
  }
}

export class UserMapper {
  static toDomain(user: User): UserModel {
    return {
      email: user.email || '',
      nickname: user.nickname || '',
      id: user.id,
      password: user.password || '',
    };
  }
}
