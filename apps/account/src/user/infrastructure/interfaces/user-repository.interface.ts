import { Prisma } from '@prisma/client';
import { UserModel } from '@account/user/domain/model/user.model';

export const UserRepositorySymbol = Symbol.for('UserRepositorySymbol');

export interface IUserRepository {
  createUser(args: Prisma.UserCreateArgs): Promise<UserModel>;
  deleteUser(args: Prisma.UserDeleteArgs): Promise<UserModel>;
  findUserUnique(args: Prisma.UserFindUniqueArgs): Promise<UserModel | null>;
  findUserFirst(args: Prisma.UserFindFirstArgs): Promise<UserModel | null>;
}
