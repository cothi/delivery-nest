import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { PaymentService } from './application/services/payment.service';
import { PaymentResolver } from './presentation/resolver/payment.resolver';
import { CqrsModule } from '@nestjs/cqrs';
import { TossConfirmHandler } from './application/command/handlers/toss-payment.handler';

@Module({
  imports: [
    CqrsModule,
    HttpModule.registerAsync({
      useFactory: () => ({
        timeout: 5000,
        maxRedirects: 5,
      }),
    }),
  ],
  providers: [
    {
      provide: 'AXIOS_INSTANCE_TOKEN',
      useValue: HttpModule,
    },
    PaymentService,
    TossConfirmHandler,
    PaymentResolver,
  ],
  exports: [HttpModule],
})
export class PaymentModule {}
