import { IsEnum, IsNumber, IsString } from "class-validator"
import { OrderStatus } from "src/entities/order.entity"

export class UpdateOrderDto {
    date: string

    @IsNumber()
    discount: number

    @IsString()
    cName: string

    @IsEnum(OrderStatus)
    status: OrderStatus
    
}