import { Controller } from '@nestjs/common';
import { Get, Post, Put, Patch, Delete, Param, Body, Res} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/create-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //GET
  @Get('all')
  async getAllOrders() {
    return this.ordersService.getAllOrders()
  }

  //POST
  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.ordersService.createOrder(dto)
  }

}
