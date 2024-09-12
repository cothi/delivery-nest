import {Field, ID, ObjectType, registerEnumType} from "@nestjs/graphql";

export enum OrderStatus {
    PENDING = 'PENDING',
    PREPARING = 'PREPARING',
    OUT_FOR_DELIVERY = 'OUT_FOR_DELIVERY',
    DELIVERY = 'DELIVERY',
    CANCELED = 'CANCELED',
}

registerEnumType(OrderStatus, {
    name: 'OrderStatus',
});


@ObjectType()
export class Order{
    @Field(type => ID)
    id: string;

    @Field()
    userId: string;
}