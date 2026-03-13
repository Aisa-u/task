import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, OneToMany } from 'typeorm'
import { Product } from 'src/products/entities/product.entity'
import { ApiProperty } from '@nestjs/swagger'

@Entity()
export class Category {
  @ApiProperty({ example: 1, description: 'Уникальный идентификатор' })
  @PrimaryGeneratedColumn()
  id: number

  @ApiProperty({ example: 'Technic', description: 'Название категории' })
  @Column()
  name: string

  @ApiProperty({ example: 'Something', description: 'Описание' })
  @Column()
  description: string

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @DeleteDateColumn()
  deletedAt: Date

  @OneToMany(() => Product, (product) => product.category)
  products: Product[]
}
