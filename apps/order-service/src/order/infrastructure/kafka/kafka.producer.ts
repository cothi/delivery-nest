import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KafkaTopics } from '../../application/common/enum/kafka-topics.enum';

@Injectable()
export class KafkaProducer implements OnModuleInit {
  constructor(
    @Inject('KAFKA_SERVICE')
    private readonly kafkaClient: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.kafkaClient.connect();
  }

  async produce(topic: KafkaTopics, message: any) {
    return this.kafkaClient.emit(topic, JSON.stringify(message));
  }
}
