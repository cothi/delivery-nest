import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'payment-order',
            brokers: ['kafka:9092'],
          },
        },
      },
    ]),
  ],
  providers: [],
})
export class KafkaModule {}
