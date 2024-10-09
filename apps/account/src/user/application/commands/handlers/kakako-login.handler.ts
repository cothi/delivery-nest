import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { Injectable } from '@nestjs/common';

import { JwtTokenService } from '@libs/jwt';
import { KakaoLoginCommand } from '@account/user/application/commands/kakao-login.command';
import { UserService } from '@account/user/application/services/user.service';
import { TokenPairDto } from '@account/user/presentation/dto/res/token-pair.dto';

@Injectable()
@CommandHandler(KakaoLoginCommand)
export class KakaoLoginHandler implements ICommandHandler {
  constructor(
    private readonly userService: UserService,
    private readonly jwtTokenService: JwtTokenService,
  ) {}
  async execute(cmd: KakaoLoginCommand): Promise<TokenPairDto> {
    try {
      const user = await this.userService.kakaoLogin(cmd.code);
      return this.jwtTokenService.generateTokenPair({
        userId: user.id,
      });
    } catch (error) {
      throw error;
    }
  }
}
