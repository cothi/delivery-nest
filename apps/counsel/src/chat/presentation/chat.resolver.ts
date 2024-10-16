import { Args, Mutation, Resolver, Subscription } from '@nestjs/graphql';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { SendMessageCommand } from '@counsel/chat/application/commands/send-message.command';
import { SubscribeRoomQuery } from '@counsel/chat/application/queries/subscribe-room.query';
import { SubscribeRoomInput } from '@counsel/chat/presentation/dto/input/subscribe-room.input';
import { SendMessageInput } from '@counsel/chat/presentation/dto/input/send-message.input';

@Resolver('Chat')
export class ChatResolver {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Mutation(() => String)
  async sendMessage(@Args('input') input: SendMessageInput): Promise<void> {
    const command = new SendMessageCommand(input.roomId, input.message);
    return await this.commandBus.execute(command);
  }

  @Subscription(() => String)
  messageAdded(@Args('input') input: SubscribeRoomInput): Promise<void> {
    const query = new SubscribeRoomQuery(input.roomId);
    return this.queryBus.execute(query);
  }
}
