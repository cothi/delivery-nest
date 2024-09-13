import {Field, Float, ID, ObjectType} from "@nestjs/graphql";
import {Order as PrismaOrder, OrderStatus, OrderFood as PrismaOrderFood} from "@prisma/client";
import {OrderFood} from "./order-food.model";


@ObjectType()
export class Order implements PrismaOrder {
    @Field(() => ID)
    id: string;

    @Field(() => ID)
    customerId: string;

    @Field(() => ID)
    restaurantId: string;

    @Field(() => Float)
    totalAmount: number;

    @Field(() => String)
    status: OrderStatus;

    @Field(() => [OrderFood])
    orderFoods: OrderFood[];

    @Field(() => Date)
    createdAt: Date;

    @Field(() => Date)
    updatedAt: Date;

    @Field(() => ID, {nullable: true})
    deliveryId: string | null;

    @Field(() => ID, {nullable: true})
    paymentId: string | null;

    private constructor(order: PrismaOrder) {
        Object.assign(this,order);
    }

    static create(order: PrismaOrder): Order {
        return new Order(order);
    }
}