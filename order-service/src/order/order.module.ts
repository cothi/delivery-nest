import {Module} from "@nestjs/common";
import {OrderResolver} from "./presentaion/resolver/order.resolver";

@Module({
    providers: [OrderResolver]
})
export class OrderModule {}
