import {Args, Resolver} from "@nestjs/graphql";
import {Query} from "@nestjs/graphql";
import {Order} from "../../domain/model/order.model";
import {CommandBus} from "@nestjs/cqrs";

@Resolver(() => Order)
export class OrderResolver {
    constructor( private readonly commandBus: CommandBus ) { }

    @Query(() => Order)
    async order(@Args('id') id: string) { }
}