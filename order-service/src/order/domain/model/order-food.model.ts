import {Field, Float, ID, Int, ObjectType, registerEnumType} from "@nestjs/graphql";
import {OrderFood as PrismaOrderFood} from "@prisma/client";


@ObjectType()
export class OrderFood implements PrismaOrderFood {
    @Field(() => ID)
    id: string;

    @Field(() => ID)
    orderId: string;

    @Field()
    foodId: string;

    @Field(() => Float)
    price: number;

    @Field(() => Int)
    quantity: number;
    private constructor(orderFood: PrismaOrderFood) {
        Object.assign(this, orderFood)
    }
    static create(orderFood: PrismaOrderFood) {
        return new OrderFood(orderFood)
    }
}