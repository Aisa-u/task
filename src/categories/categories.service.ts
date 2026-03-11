import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor (
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ) {}

    async getAllCategories() {
        return this.categoryRepository.find();
    }

    async getCategoryById(id: number) {
        const category = await this.categoryRepository.findOneBy({id})

        if (!category) {
            throw new NotFoundException('Category not found')
        }

        return category;
    }

    async createCategory(dto: CreateCategoryDto) {
        const category = await this.categoryRepository.create(dto);

        return this.categoryRepository.save(category);
    }

    async updateCategory(id: number, dto: UpdateCategoryDto) {
        await this.categoryRepository.update(id, dto)

        return true;
    }

    async patchUpdateCategory(id: number, dto: Partial<UpdateCategoryDto>) {
        await this.categoryRepository.update(id, dto)

        return true;
    }

    async deleteCategory(id: number) {
        await this.categoryRepository.delete(id)

        return true;
    }
}
