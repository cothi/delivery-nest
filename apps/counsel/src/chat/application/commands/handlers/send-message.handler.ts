import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { SendMessageCommand } from '@counsel/chat/application/commands/send-message.command';
import { ChatService } from '@counsel/chat/domain/services/chat.service';

@CommandHandler(SendMessageCommand)
export class SendMessageHandler implements ICommandHandler<SendMessageCommand> {
  constructor(private readonly chatService: ChatService) {}

  async execute(command: SendMessageCommand): Promise<void> {
    return await this.chatService.sendMessage(command.roomId, command.message);
  }
}
