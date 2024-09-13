import {Injectable} from "@nestjs/common";
import {ICommand} from "@nestjs/cqrs";
import {OrderStatus} from "@prisma/client";
import {PrismaService} from "../prisma/prisma.service";
import {OrderMapper} from "./mapper/order.mapper";
import {Order} from "../../domain/model/order.model";


export interface OrderFood {
    foodId: string;
    quantity: number;
    price: number;
}

export class CreateOrderCmd implements ICommand {
    constructor(
        public readonly restaurantId: string,
        public readonly customerId: string,
        public readonly totalAmount: number,
        public readonly foodFoods: OrderFood[]
    ){ }
}

export class UpdateOrderStatusCmd implements ICommand {
    constructor(
        public readonly orderId: string,
        public readonly orderStatus: OrderStatus
    ) { }
}


@Injectable()
export class OrderRepository {
    constructor(private readonly prismaService: PrismaService) { }
    async createOrder(cmd: CreateOrderCmd) : Promise<Order>{
        const entity = OrderMapper.createToPersistence(cmd);
        const order = await this.prismaService.order.create({
            data:entity
        });
        return OrderMapper.toDomain(order);
    }


    async updateOrderStatus(cmd: UpdateOrderStatusCmd) : Promise<Order>{
        const entity = OrderMapper.updateToPersistence(cmd);
        const order = await this.prismaService.order.update({
            where: {id: cmd.orderId},
            data: entity
        });
        return OrderMapper.toDomain(order);
    }

    async getOrderById(id: string): Promise<Order> {
        const order = await this.prismaService.order.findUnique({
            where: {id: id}
        });

        return OrderMapper.toDomain(order);
    }
}