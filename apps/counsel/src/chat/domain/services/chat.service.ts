import { Injectable } from '@nestjs/common';
import { PubsubService } from '@counsel/chat/infrastructure/pubsub/pubsub.service';

@Injectable()
export class ChatService {
  constructor(private readonly pubSubService: PubsubService) {}
  async sendMessage(roomId: string, message: string): Promise<void> {
    await this.pubSubService.publish(roomId, message);
  }

  subscribeToRoom(roomId: string) {
    this.pubSubService.asyncIterator(roomId);
  }
}
