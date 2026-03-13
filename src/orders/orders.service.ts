import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { UpdateOrderDto } from 'src/dto/update-order.dto';
import { OrderItem } from 'src/entities/order-item.entity';
import { Order, OrderStatus } from 'src/entities/order.entity';
import { Repository } from 'typeorm';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,

        @InjectRepository(OrderItem)
        private orderItemRepository: Repository<OrderItem>,
    
    ) {}

    async getAllOrders() {
        return await this.orderRepository.find({
            relations: {
                orderItems: true
            }
        })
    }

    async getOrderById(id: number): Promise<Order> {
        const order = await this.orderRepository.findOneBy({ id })

        if(!order) {
            throw new NotFoundException('Order not found')
        }

        return order;
    }

    @Transactional()
    async createOrder(dto: CreateOrderDto): Promise<Order> {

        const order = this.orderRepository.create({
            date: dto.date,
            discount: dto.discount,
            cName: dto.cName,
            status: OrderStatus.PLACED
        })

        await this.orderRepository.save(order)

        const orderItems = dto.orderItems.map((item) =>
            this.orderItemRepository.create({
                order: { id: order.id },
                product: { id: item.productId },
                quantity: item.quantity
            })
        )

        await this.orderItemRepository.save(orderItems)

        return order
    }

    @Transactional()
    async updateOrder(id: number, dto: UpdateOrderDto): Promise<Order> {

        const order = await this.getOrderById(id)

        if(dto.status) {
            order.status = dto.status
        }

        await this.orderRepository.save(order)

        if(dto.orderItems) {
            await this.orderItemRepository.delete({ order: { id: order.id } });

            const orderItems = dto.orderItems.map((item) =>
                this.orderItemRepository.create({
                    order: { id: order.id },
                    product: { id: item.productId },
                    quantity: item.quantity
                })
            )

            await this.orderItemRepository.save(orderItems)
        }
        
        return order

    }
}
