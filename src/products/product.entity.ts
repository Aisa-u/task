import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn } from 'typeorm'
import { Category } from 'src/categories/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Order } from 'src/orders/order.entity';

@Entity()
export class Product {
    @ApiProperty({example: 1, description: "Уникальный идентификатор"})
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty({example: "Staff", description: "Название товара"})
    @Column()
    name: string;

    @ApiProperty({example: "Somethingsomthing", description: "Описание товара"})
    @Column()
    description: string;

    @ApiProperty({example: 20, description: "Цена товара"})
    @Column()
    price: number

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: "categoryId" })
    category: Category;

    @ApiProperty({example: "", description: "Ссылка к фото"})
    @Column()
    image: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @ManyToOne(() => Order, (orders) => orders.order_details.products_id)
    orders: Order[]
}