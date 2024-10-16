import { IQuery } from '@nestjs/cqrs';

export class GetRoomsQuery implements IQuery {
  constructor(public readonly userId: string) {}
}
