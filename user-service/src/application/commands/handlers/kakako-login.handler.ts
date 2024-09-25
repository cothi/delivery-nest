import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { KakaoLoginCommand } from '../kakao-login.command';
import { Injectable } from '@nestjs/common';

@Injectable()
@CommandHandler(KakaoLoginCommand)
export class KakakaoLoginHandler implements ICommandHandler {
  constructor() {}
  async execute(cmd: KakaoLoginCommand): Promise<Boolean> {}
}
