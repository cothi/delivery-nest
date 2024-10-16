import { IQuery } from '@nestjs/cqrs';

export class GetRoomQuery implements IQuery {
  constructor(public readonly roomId: string) {}
}
