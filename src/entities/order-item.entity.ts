import { Entity, Column, ManyToOne, JoinColumn, PrimaryGeneratedColumn } from 'typeorm'
import { Order } from './order.entity'
import { Product } from './product.entity'

@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn()
        id: number

    @ManyToOne(() => Order, (order) => order.orderItems)
    @JoinColumn({ name: "orderId" })
    order: Order

    @ManyToOne(() => Product, (product) => product.orderItems)
    @JoinColumn({ name: "productId" })
    product: Product

    @Column()
    quantity: number
}