import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { OrderItem } from './order-item.entity'
import { ApiProperty } from '@nestjs/swagger'

export enum OrderStatus {
  PLACED = 'order placed',
  PROCESS = 'processing',
  DELIVERED = 'delivered',
  CANCEL = 'cancelled'
}

@Entity()
export class Order {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: '2020-12-02', description: 'Дата содания заказа' })
  @Column({ type: 'date' })
  date: string

  @ApiProperty({ example: 20, description: 'Скидка' })
  @Column()
  discount: number

  @ApiProperty({ example: 'Alexei', description: 'Имя заказчика' })
  @Column({ name: 'customerName' })
  cName: string

  @ApiProperty({ example: 'processing', description: 'Статус заказа' })
  @Column({
    type: 'enum',
    enum: OrderStatus
  })
  status: OrderStatus

  @OneToMany(() => OrderItem, (item) => item.order, {
    cascade: true
  })
  orderItems: OrderItem[]
}
