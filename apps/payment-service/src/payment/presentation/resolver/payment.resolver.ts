import { Args, Mutation, Resolver } from '@nestjs/graphql';

import { CommandBus } from '@nestjs/cqrs';
import { TossConfirmCommand } from '../../application/command/toss-confirm.command';
import { TossConfirmInput } from './dto/toss-confirm.input';
import { TossConfirmOutput } from './dto/toss-confirm.output';

@Resolver(() => TossConfirmOutput)
export class PaymentResolver {
  constructor(private readonly commandBus: CommandBus) {}

  @Mutation(() => TossConfirmOutput)
  async confirmPayment(
    @Args('input') input: TossConfirmInput,
  ): Promise<TossConfirmOutput> {
    const command = new TossConfirmCommand(
      input.orderId,
      input.paymentKey,
      input.amount,
    );
    return await this.commandBus.execute(command);
  }
}
