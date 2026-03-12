import { IsString, IsEnum, IsNumber } from "class-validator";
import { OrderItem } from "src/entities/order-item.entity";
import { OrderStatus } from "src/entities/order.entity";

export class Order {
    date: string
    
    @IsNumber()
    discount: number

    @IsString()
    cName: string

    @IsEnum(OrderStatus)
    status: OrderStatus

    items: OrderItem[]

}