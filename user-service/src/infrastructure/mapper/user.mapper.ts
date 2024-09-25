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
      ...user,
    };
  }
}

export class UserMapper {
  static toDomain(user: User): UserModel {
    return {
      ...user,
    };
  }
}
