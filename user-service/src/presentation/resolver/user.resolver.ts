import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../dto/req/create-user.dto';
import { User } from '../../domain/model/user.model';
import { LoginInput } from '../dto/req/login.dto';
import { LoginResponse } from '../dto/req/login-response.dto';
import { TokenPairDto } from '../dto/res/token-pair.dto';
import { CommandBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { LoginUserQuery } from '../../application/queries/login-user.query';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly commandBus: CommandBus) {}
  @Mutation(() => TokenPairDto)
  async signUp(@Args('input') input: CreateUserDto): Promise<TokenPairDto> {
    const command = new CreateUserCommand(input.nickname, input.email, input.password);
    return await this.commandBus.execute(command);
  }

  @Mutation(() => TokenPairDto)
  async login(@Args('input') loginInput: LoginInput): Promise<TokenPairDto> {
    const query = new LoginUserQuery(loginInput.email, loginInput.password);
    return await this.commandBus.execute(query);
  }

  @Mutation(() => Boolean)
  async deleteAccount(@Args('id') id: string): Promise<boolean> {
    return true;
  }

  @Query(() => User)
  async user(@Args('id') id: string) {}
}
