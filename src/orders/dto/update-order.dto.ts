import { IsEnum, IsInt, IsNumber, IsString, Min } from 'class-validator'
import { OrderStatus } from 'src/orders/entities/order.entity'

export class UpdateOrderDto {
  date: string

  @IsNumber()
  discount: number

  @IsString()
  cName: string

  @IsEnum(OrderStatus)
  status: OrderStatus

  orderItems: UpdateOrderItemDto[]
}

export class UpdateOrderItemDto {
  @IsInt()
  productId: number

  @IsInt()
  @Min(1)
  quantity: number
}
