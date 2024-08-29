import { PrismaClient, User } from '@prisma/client';
import { CreateUserDto } from '../../presentation/dto/req/create-user.dto';
import { User as UserModel } from '../../domain/model/user.model';

export class CreateUserMapper {
  static toPersistence(user: CreateUserDto): Omit<User, 'id'> {
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
