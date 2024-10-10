import { UserModel } from '../../domain/model/user.model';
import { User } from '@prisma/client';

export class CreateUserMapper {
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
