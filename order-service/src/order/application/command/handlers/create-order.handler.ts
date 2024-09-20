import { Injectable } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateOrderCmd } from '../create-order.command';
import { OrderService } from '../../services/order.service';
import { Order } from '../../../domain/model/order.model';
import { KafkaProducer } from '../../../infrastructure/kafka/kafka.producer';
import { KafkaTopics } from '../../common/enum/kafka-topics.enum';

@Injectable()
@CommandHandler(CreateOrderCmd)
export class CreateOrderHandler implements ICommandHandler<CreateOrderCmd> {
  constructor(
    private readonly orderService: OrderService,
    //private readonly kafkaProducer: KafkaProducer,
  ) {}
  async execute(cmd: CreateOrderCmd): Promise<Order> {
    const order = await this.orderService.createOrder(cmd);
    //await this.kafkaProducer.produce(KafkaTopics.ORDER_CREATED, order);
    return order;
  }
}
