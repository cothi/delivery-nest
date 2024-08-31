import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDto } from '../dto/req/create-user.dto';
import { User } from '../../domain/model/user.model';
import { LoginInput } from '../dto/req/login.dto';
import { LoginResponse } from '../dto/req/login-response.dto';
import { TokenPairDto } from '../dto/res/token-pair.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateUserCommand } from '../../application/commands/create-user.command';
import { LoginUserQuery } from '../../application/queries/login-user.query';
import { DeleteUserCommand } from '../../application/commands/delete-user.command';
import { JwtAuthGuard } from '../../utils/guard/jwt-auth.guard';
import { TokenInfo } from '../../utils/decorators/token-info.decorator';
import { JwtPayload } from '../../utils/jwt/interfaces/jwt-token.interface';
import { UseGuards } from '@nestjs/common';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  @Mutation(() => TokenPairDto)
  async signUp(@Args('input') input: CreateUserDto): Promise<TokenPairDto> {
    const command = new CreateUserCommand(input.nickname, input.email, input.password);
    return await this.commandBus.execute(command);
  }

  @Mutation(() => TokenPairDto)
  async login(@Args('input') loginInput: LoginInput): Promise<TokenPairDto> {
    const query = new LoginUserQuery(loginInput.email, loginInput.password);
    return await this.queryBus.execute(query);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteAccount(@TokenInfo() payload: JwtPayload): Promise<boolean> {
    const command = new DeleteUserCommand(payload.userId);
    return await this.commandBus.execute(command);
  }

  @Query(() => String)
  @UseGuards(JwtAuthGuard)
  async user() {
    return 'test';
  }
}
