import {Field, ObjectType} from "@nestjs/graphql";

@ObjectType()
export class TossConfirmOutput {
    @Field()
    paymentKey: string;

    @Field()
    orderId: string;

    @Field()
    orderName: string;

    @Field()
    status: string;

    @Field()
    requestedAt: Date;

    @Field()
    approvedAt: Date;

    constructor(data: {
        paymentKey: string;
        orderId: string;
        orderName: string;
        status: string;
        requestedAt: Date;
        approvedAt: Date;
    }) {
        Object.assign(this, data);
    }

}
