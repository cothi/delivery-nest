import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard, JwtPayload } from '@libs/jwt';
import { TokenInfo } from '@libs/decorators';
import { CreateUserCommand } from '@account/user/application/commands/create-user.command';
import { LoginInput } from '@account/user/presentation/dto/req/login.input';
import { LoginUserQuery } from '@account/user/application/queries/login-user.query';
import { DeleteUserCommand } from '@account/user/application/commands/delete-user.command';
import { KakaoAuthInput } from '@account/user/presentation/dto/req/kakaoAuth.input';
import { KakaoLoginCommand } from '@account/user/application/commands/kakao-login.command';
import { GetKakaoAuthUrlQuery } from '@account/user/application/queries/get-kakao-auth-url.query';
import { UserModel } from '@account/user/domain/model/user.model';
import { KakaoAuthObj } from '@account/user/presentation/dto/res/kakao-auth-url.object';
import { TokenPairObj } from '@account/user/presentation/dto/res/token-pair.object';
import { CreateUserInput } from '@account/user/presentation/dto/req/create-user.input';
import { UserRoleModel } from '@account/user/domain/model/user-role.model';
import { RegisterRoleInput } from '@account/user/presentation/dto/req/register-role.input';
import { RegisterRoleCommand } from '@account/user/application/commands/register-role.command';

@Resolver(() => UserModel)
export class UserResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  @Mutation(() => TokenPairObj)
  async signUp(@Args('input') input: CreateUserInput): Promise<TokenPairObj> {
    const command = new CreateUserCommand(
      input.nickname,
      input.email,
      input.password,
    );
    return await this.commandBus.execute(command);
  }

  @Mutation(() => TokenPairObj)
  async login(@Args('input') loginInput: LoginInput): Promise<TokenPairObj> {
    const query = new LoginUserQuery(loginInput.email, loginInput.password);
    return await this.queryBus.execute(query);
  }

  @Mutation(() => Boolean)
  @UseGuards(JwtAuthGuard)
  async deleteAccount(@TokenInfo() payload: JwtPayload): Promise<boolean> {
    const command = new DeleteUserCommand(payload.userId);
    return await this.commandBus.execute(command);
  }

  @Mutation(() => TokenPairObj)
  async kakaoAuthLogin(
    @Args('input') input: KakaoAuthInput,
  ): Promise<TokenPairObj> {
    const command = new KakaoLoginCommand(input.code);
    return await this.commandBus.execute(command);
  }

  @Query(() => KakaoAuthObj)
  async getKakaoAuthUrl(): Promise<KakaoAuthObj> {
    const query = new GetKakaoAuthUrlQuery();
    return await this.queryBus.execute(query);
  }

  @Mutation(() => UserRoleModel)
  @UseGuards(JwtAuthGuard)
  async registerRole(
    @Args('input') input: RegisterRoleInput,
    @TokenInfo() payload: JwtPayload,
  ): Promise<UserRoleModel> {
    const command = new RegisterRoleCommand(input.role, payload.userId);
    return await this.commandBus.execute(command);
  }
}
