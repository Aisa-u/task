import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm'
import { Order } from './order.entity'
import { Product } from './product.entity'

@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @ManyToOne(() => Order, (order) => order.orderItems)
    orderId: Order

    @ManyToOne(() => Product, (product) => product.orderItems)
    productId: Product

}