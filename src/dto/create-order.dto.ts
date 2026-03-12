import { IsString, IsEnum, IsNumber } from "class-validator";
import { OrderStatus } from "src/entities/order.entity";
import { CreateOrderItemDto } from "./create-order-item.dto";

export class CreateOrderDto {
    date: string
    
    @IsNumber()
    discount: number

    @IsString()
    cName: string

    items: CreateOrderItemDto[]

}