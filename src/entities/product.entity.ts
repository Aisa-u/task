import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm'
import { Category } from 'src/entities/category.entity';
import { ApiProperty } from '@nestjs/swagger';
import { OrderItem } from 'src/entities/order-item.entity';

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

    @ApiProperty({example: "", description: "Ссылка к фото"})
    @Column()
    image: string;

    @CreateDateColumn()
    createdAt: Date

    @UpdateDateColumn()
    updatedAt: Date

    @DeleteDateColumn()
    deletedAt: Date

    @OneToMany(() => OrderItem, (item) => item.productId)
    orderItems: OrderItem[]

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: "categoryId" })
    category: Category;
}