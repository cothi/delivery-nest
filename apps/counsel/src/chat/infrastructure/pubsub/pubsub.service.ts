import { Injectable } from '@nestjs/common';
import { PubSub } from 'graphql-subscriptions';

@Injectable()
export class PubsubService {
  private pubSub: PubSub;
  constructor() {
    this.pubSub = new PubSub();
  }
  async publish(triggerName: string, payload: any): Promise<void> {
    await this.pubSub.publish(triggerName, payload);
  }
  asyncIterator(triggerName: string) {
    return this.pubSub.asyncIterator(triggerName);
  }
}
