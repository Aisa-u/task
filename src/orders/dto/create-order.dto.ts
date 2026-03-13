import { IsString, IsNumber, IsInt, Min } from "class-validator";

export class CreateOrderDto {
    date: string
    
    @IsNumber()
    discount: number

    @IsString()
    cName: string

    orderItems: CreateOrderItemDto[]

}

export class CreateOrderItemDto {

    @IsInt()
    productId: number

    @IsInt()
    @Min(1)
    quantity: number

}