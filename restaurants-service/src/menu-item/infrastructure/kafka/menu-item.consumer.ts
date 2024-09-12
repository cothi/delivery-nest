import {Controller, Injectable} from '@nestjs/common';
import {ClientKafka, MessagePattern, Payload} from '@nestjs/microservices';
import {OnModuleInit} from "@nestjs/common";

@Controller()
export class MenuItemConsumer {
  @MessagePattern('restaurant.food.create')
  handleFoodCreated(@Payload() data: any) {

    console.log(data);
  }
}
