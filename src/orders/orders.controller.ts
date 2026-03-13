import { Controller } from '@nestjs/common';
import { Get, Post, Put, Patch, Delete, Param, Body, Res} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //GET
  @Get('all')
  async getAllOrders() {
    return await this.ordersService.getAllOrders()
  }

  //GET BY ID
  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return await this.ordersService.getOrderById(+id)
  }

  //POST
  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.ordersService.createOrder(dto)
  }

  //PATCH
  @Patch(':id')
  async updateOrder(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return await this.ordersService.updateOrder(+id, dto)
  }

}
