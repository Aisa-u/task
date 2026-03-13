import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderItem } from './order-item.entity'

export enum OrderStatus {
    PLACED = 'order placed',
    PROCESS = 'processing',
    DELIVERED = "delivered",
    CANCEL = 'cancelled'
}

@Entity()
export class Order {
    
    @PrimaryGeneratedColumn()
    id: number

    @Column({ type: 'date' })
    date: string

    @Column()
    discount: number

    @Column({ name: 'customerName' })
    cName: string
    
    @Column({
        type: 'enum',
        enum: OrderStatus,
    })
    status: OrderStatus

    @OneToMany(() => (OrderItem), (item) => item.order, { 
        cascade: true 
    })
    orderItems: OrderItem[]

}