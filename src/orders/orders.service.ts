import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from 'src/dto/create-order.dto';
import { OrderItem } from 'src/entities/order-item.entity';
import { Order, OrderStatus } from 'src/entities/order.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order)
        private orderRepository: Repository<Order>,
        private dataSource: DataSource
    ) {}

    async createOrder(dto: CreateOrderDto) {
        return await this.dataSource.transaction(async (manager) => {

            const order = manager.create(Order, {
                ...dto,
                status: OrderStatus.PLACED
            })

            await manager.save(order)

            const orderItems = dto.items.map(item =>
                manager.create(OrderItem, {
                    order,
                    product: { id: item.productId },
                    quantity: item.quantity
                })
            )

            await manager.save(orderItems)

            return order
            
        })

    }

}
