import { Module } from '@nestjs/common';
import { ChatResolver } from '@counsel/chat/presentation/chat.resolver';

@Module({
  providers: [ChatResolver],
})
export class ChatModule {}
