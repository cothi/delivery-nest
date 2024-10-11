import { Prisma } from '@prisma/client';
import { UserModel } from '@account/user/domain/model/user.model';

export const UserRepositorySymbol = Symbol.for('UserRepositorySymbol');

export interface IUserRepository {
  createUser(args: Prisma.UsersCreateArgs): Promise<UserModel>;
  deleteUser(args: Prisma.UsersDeleteArgs): Promise<UserModel>;
  findUserUnique(args: Prisma.UsersFindUniqueArgs): Promise<UserModel | null>;
  findUserFirst(args: Prisma.UsersFindFirstArgs): Promise<UserModel | null>;
}
