import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
import { PubSub } from 'graphql-subscriptions';

const pubSub = new PubSub();

@Resolver('Chat')
export class ChatResolver {
  @Query(() => String)
  async getMessage(): Promise<string> {
    return 'Hello from GraphQL';
  }

  @Mutation(() => String)
  async sendMessage(@Args('message') msg: string): Promise<string> {
    await pubSub.publish('messageAdded', { messageAdded: msg });
    return msg;
  }

  @Subscription(() => String)
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }
}
