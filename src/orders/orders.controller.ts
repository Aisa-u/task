import { Controller } from '@nestjs/common';
import { Get, Post, Patch, Delete, Param, Body} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Order } from 'src/entities/order.entity';

@ApiTags("Заказы")
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  //GET
  @ApiOperation({summary: "Получить все заказы"})
  @ApiResponse({status: 200, type: Order})
  @Get('all')
  async getAllOrders() {
    return await this.ordersService.getAllOrders()
  }

  //GET BY ID
  @ApiOperation({summary: "Получить заказ по id"})
  @ApiResponse({status: 200, type: Order})
  @Get(':id')
  async getOrderById(@Param('id') id: string) {
    return await this.ordersService.getOrderById(+id)
  }

  //POST
  @ApiOperation({summary: "Создать новый заказ"})
  @ApiResponse({status: 200, type: Order})
  @Post()
  async createOrder(@Body() dto: CreateOrderDto) {
    return await this.ordersService.createOrder(dto)
  }

  //PATCH
  @ApiOperation({summary: "Изменить заказ по id"})
  @ApiResponse({status: 200, type: Order})
  @Patch(':id')
  async updateOrder(@Param('id') id: string, @Body() dto: UpdateOrderDto) {
    return await this.ordersService.updateOrder(+id, dto)
  }

  //DELETE
  @ApiOperation({summary: "Удалить заказ по id"})
  @ApiResponse({status: 200, type: Order})
  @Delete('delete/:id')
  async deleteOrder(@Param('id') id: string) {
    return await this.ordersService.deleteOrder(+id)
  }

}
