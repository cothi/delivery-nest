import {Args, Resolver} from "@nestjs/graphql";
import {Order} from "../order.model";
import {Query} from "@nestjs/graphql";

@Resolver(() => Order)
export class OrderResolver {

    @Query(() => Order)
    async order(@Args('id') id: string) {
        const test:Order ={
            userId: "qwe",
            id: "qwe"
        }
        return test;
    }

}