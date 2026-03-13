import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { FilesService } from 'src/files/files.service';

@Injectable()
export class ProductsService {
    constructor (
        @InjectRepository(Product)
        private productRepository: Repository<Product>,
        private fileService: FilesService,
    ) {}

    async getAllProducts() {
        const products = await this.productRepository.find({
            relations: {
                category: true,
                orderItems: true
            }
        })

        return products
    }

    async getProductById(id: number) {
        const product = await this.productRepository.findOneBy({id})

        if (!product) {
            throw new NotFoundException('Product not found')
        }

        return product;
    }
    
    async createProduct(dto: CreateProductDto, image: any) {
        const createData: any = { ...dto };

        if (dto.categoryId !== undefined) {
            createData.category = { id: dto.categoryId };
        }

        const fileName = await this.fileService.createFile(image)

        const product = this.productRepository.create({...createData, image: fileName});

        return this.productRepository.save(product);
    }

    async updateProduct(id: number, dto: UpdateProductDto) {
        const updateData: any = { ...dto }

        if (dto.categoryId !== undefined) {
            updateData.category = { id: dto.categoryId };
        }

        return await this.productRepository.update(id, updateData); 

    }

    async patchUpdateProduct(id: number, dto: Partial<UpdateProductDto>) {
        const updateData: any = { ...dto };

        if (dto.categoryId !== undefined) {
            updateData.category = { id: dto.categoryId };
        }

        return await this.productRepository.update(id, updateData); 
    }

    async deleteProduct(id: number) {
        return await this.productRepository.delete(id)
    }
}

