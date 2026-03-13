import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm'
import { Order } from './order.entity'
import { Product } from './product.entity'

@Entity()
export class OrderItem {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    quantity: number

    @ManyToOne(() => Product, (product) => product.orderItems)
    @JoinColumn({ name: "productId" })
    product: Product


    @ManyToOne(() => Order, (order) => order.orderItems)
    @JoinColumn({ name: "orderId" })
    order: Order

}