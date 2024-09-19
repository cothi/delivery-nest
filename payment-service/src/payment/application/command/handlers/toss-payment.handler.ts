import { Injectable } from '@nestjs/common';
import { PaymentService } from '../../services/payment.service';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { TossConfirmCommand } from '../toss-confirm.command';
import {TossConfirmOutput} from "../../../presentation/resolver/dto/toss-confirm.output";

@Injectable()
@CommandHandler(TossConfirmCommand)
export class TossConfirmHandler implements ICommandHandler<TossConfirmCommand> {
  constructor(private readonly paymentService: PaymentService) {}
  async execute(command: TossConfirmCommand): Promise<TossConfirmOutput>{
    return await this.paymentService.confirmTossPayment(command);
  }
}
