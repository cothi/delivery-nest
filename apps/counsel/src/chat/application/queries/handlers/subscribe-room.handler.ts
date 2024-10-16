import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { SubscribeRoomQuery } from '@counsel/chat/application/queries/subscribe-room.query';
import { ChatService } from '@counsel/chat/domain/services/chat.service';

@QueryHandler(SubscribeRoomQuery)
export class SubscribeRoomHandler implements IQueryHandler<SubscribeRoomQuery> {
  constructor(private readonly chatService: ChatService) {}
  async execute(query: SubscribeRoomQuery): Promise<void> {
    try {
      this.chatService.subscribeToRoom(query.roomId);
    } catch (e) {
      throw e;
    }
  }
}
