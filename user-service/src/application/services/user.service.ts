import { Injectable } from '@nestjs/common';
import { LoginInput } from '../../presentation/dto/req/login.dto';
import { UserRepository } from '../../infrastructure/persistence/user.repository';
import { CreateUserDto } from '../../presentation/dto/req/create-user.dto';
import { User } from '../../domain/model/user.model';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}
  async signUp(createUser: CreateUserDto): Promise<User> {
    const user = await this.userRepository.createAccount(createUser);
    return user;
  }
  async deleteAccount(userId: string) {}
  async login(loginInput: LoginInput) {}
}
