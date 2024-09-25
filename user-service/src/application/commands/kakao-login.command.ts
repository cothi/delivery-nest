import { ICommand } from '@nestjs/cqrs';

export class KakaoLoginCommand implements ICommand {
  constructor(public readonly code: string) {}
}
