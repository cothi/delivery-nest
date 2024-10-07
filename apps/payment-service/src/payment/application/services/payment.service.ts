import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { TossConfirmCommand } from '../command/toss-confirm.command';
import {TossConfirmOutput} from "../../presentation/resolver/dto/toss-confirm.output";

@Injectable()
export class PaymentService {
  private readonly secretKey = 'test_gsk_docs_OaPz8L5KdmQXkzRz3y47BMw6';
  constructor(private readonly httpService: HttpService) {}

  async confirmTossPayment(command: TossConfirmCommand): Promise<TossConfirmOutput>{
    const { paymentKey, amount, orderId } = command;
    const tossUrl = 'https://api.tosspayments.com/v1/payments/confirm';
    const headers = this.getHeaders();
    try {
      const { data } = await lastValueFrom(
        this.httpService.post(
          tossUrl,
          { paymentKey, orderId, amount },
          { headers },
        ),
      );
      const { paymentKey: responsePaymentKey, orderId: responseOrderId, orderName, status, requestedAt, approvedAt } = data;

      return new TossConfirmOutput({
        paymentKey,
        orderId,
        orderName,
        status,
        requestedAt: new Date(requestedAt),
        approvedAt: new Date(approvedAt),
      })

    } catch (e) {
      throw e;
    }
  }
  private getHeaders() {
    return {
      Authorization: `Basic ${Buffer.from(this.secretKey + ':').toString('base64')}`,
      'Content-Type': 'application/json',
    };
  }
}
