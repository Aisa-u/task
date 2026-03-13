import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn,
  DeleteDateColumn, ManyToOne, JoinColumn, OneToMany
} from 'typeorm'
import { Category } from 'src/categories/entities/category.entity'
import { ApiProperty } from '@nestjs/swagger'
import { OrderItem } from 'src/orders/entities/order-item.entity'

@Entity()
export class Product {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'Staff', description: 'Название товара' })
  @Column()
  name: string

  @ApiProperty({ example: 'Somethingsomthing', description: 'Описание товара' })
  @Column()
  description: string

  @ApiProperty({ example: 20, description: 'Цена товара' })
  @Column()
  price: number

  @ApiProperty({
    example: '3bcbcfd7-9095-4c91-b461-715563c2a092.jpg',
    description: 'Ссылка к фото'
  })
  @Column()
  image: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @OneToMany(() => OrderItem, (orderItem) => orderItem.product, {
    cascade: true
  })
  orderItems: OrderItem[]

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoryId' })
  category: Category
}
