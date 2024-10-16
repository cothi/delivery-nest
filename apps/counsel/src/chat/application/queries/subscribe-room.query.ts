import { IQuery } from '@nestjs/cqrs';

export class SubscribeRoomQuery implements IQuery {
  constructor(public readonly roomId: string) {}
}
