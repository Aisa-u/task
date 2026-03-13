import { IsEnum, IsInt, Min } from "class-validator"
import { OrderStatus } from "src/entities/order.entity"

export class UpdateOrderDto {

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