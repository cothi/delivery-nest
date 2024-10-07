import {Module} from '@nestjs/common';
import {OrderResolver} from './presentaion/resolver/order.resolver';
import {CqrsModule} from "@nestjs/cqrs";

@Module({
  imports: [CqrsModule],
  providers: [OrderResolver],
})

export class OrderModule {}
