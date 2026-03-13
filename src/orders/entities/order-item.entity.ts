import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'
import { Product } from '../../products/entities/product.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class OrderItem {

    @ApiProperty({example: 1, description: "Уникальный идентификатор"})
    @PrimaryGeneratedColumn()
        id: number

    @ApiProperty({example: 5, description: "Уникальный идентификатор заказа"})
    @ManyToOne(() => Order, (order) => order.orderItems)
    @JoinColumn({ name: "orderId" })
    order: Order

    @ApiProperty({example: 2, description: "Уникальный идентификатор продукта"})
    @ManyToOne(() => Product, (product) => product.orderItems)
    @JoinColumn({ name: "productId" })
    product: Product

    @ApiProperty({example: 10, description: "Количество продукта"})
    @Column()
    quantity: number
}