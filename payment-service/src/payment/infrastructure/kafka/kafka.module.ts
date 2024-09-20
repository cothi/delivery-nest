import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KafkaConsumer } from './kafka.consumer';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payment-app',
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'kafka-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [KafkaConsumer],
})
export class KafkaModule {}
