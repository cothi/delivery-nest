import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { KafkaTopics } from '../../common/kafka-topics.enum';

@Controller()
export class KafkaConsumer {
  @EventPattern(KafkaTopics.ORDER_CREATED)
  handleOrderCreated(@Payload() message: any) {
    console.log(KafkaTopics.ORDER_CREATED, message);
  }
}
