import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { UseGuards } from '@nestjs/common';

import { JwtAuthGuard, JwtPayload } from '@libs/jwt';
import { TokenInfo } from '@libs/decorators';
import { User } from '@account/user/domain/model/user.model';
import { TokenPairDto } from '@account/user/presentation/dto/res/token-pair.dto';
import { CreateUserCommand } from '@account/user/application/commands/create-user.command';
import { CreateUserDto } from '@account/user/presentation/dto/req/create-user.dto';
import { LoginInput } from '@account/user/presentation/dto/req/login.dto';
import { LoginUserQuery } from '@account/user/application/queries/login-user.query';
import { DeleteUserCommand } from '@account/user/application/commands/delete-user.command';
import { KakaoAuthDto } from '@account/user/presentation/dto/req/kakaoAuth.dto';
import { KakaoLoginCommand } from '@account/user/application/commands/kakao-login.command';
import { KakaoAuthUrlDto } from '@account/user/presentation/dto/res/kakao-auth-url.dto';
import { GetKakaoAuthUrlQuery } from '@account/user/application/queries/get-kakao-auth-url.query';

@Resolver(() => User)
export class UserResolver {
  constructor(
    private readonly queryBus: QueryBus,
    private readonly commandBus: CommandBus,
  ) {}
  @Mutation(() => TokenPairDto)
  async signUp(@Args('input') input: CreateUserDto): Promise<TokenPairDto> {
    const command = new CreateUserCommand(
      input.nickname,
      input.email,
      input.password,
    );
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

  @Mutation(() => TokenPairDto)
  async kakaoAuthLogin(
    @Args('input') input: KakaoAuthDto,
  ): Promise<TokenPairDto> {
    const command = new KakaoLoginCommand(input.code);
    return await this.commandBus.execute(command);
  }

  @Query(() => KakaoAuthUrlDto)
  async getKakaoAuthUrl(): Promise<KakaoAuthUrlDto> {
    const query = new GetKakaoAuthUrlQuery();
    return await this.queryBus.execute(query);
  }
}
