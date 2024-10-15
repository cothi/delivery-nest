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

  @Subscription(() => String, {
    filter: (payload, variables) => {
      // 필터를 통해 특정 조건에 맞는 메시지만 필터링할 수 있음
      return true; // 모든 메시지 전달
    },
    resolve: (payload) => {
      return payload.messageAdded; // 메시지 내용 전달
    },
  })
  messageAdded() {
    return pubSub.asyncIterator('messageAdded');
  }
}
