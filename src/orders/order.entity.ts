import { Product } from 'src/products/product.entity'
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm'

export enum OrderStatus {
    PLACED = 'order placed',
    PROCCES = 'proccessing',
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

    @ManyToMany(() => Product, (products) => products.orders)
    @Column({ type: 'simple-json' })
    order_details: {
        products_id: number[],
        quantity: number
    }

}