import {Field, InputType} from "@nestjs/graphql";

@InputType()
export class OrderInput {
    @Field()
    customerId: string;

    @Field()
    restaurantId: string;

    @Field()
    orderFoods: OrderFoodInput[];
}

@InputType()
export class OrderFoodInput{
    @Field()
    FoodId: String;

    @Field()
    quantity: number;
}