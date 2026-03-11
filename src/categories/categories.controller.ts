import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from '../dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService, 
  ) {}

  //GET
  @Get('all')
  async getAllCategories() {
    return await this.categoriesService.getAllCategories();
  }

  //GET BY ID
  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return await this.categoriesService.getCategoryById(+id);
  }

  //POST
  @Post() 
  async createCategory(@Body() dto: CreateCategoryDto) {
    return await this.categoriesService.createCategory(dto);
  }

  //PUT
  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return await this.categoriesService.updateCategory(+id, dto);
  }

  //PATCH
  @Patch(':id')
  async patchUpdateCategory(@Param('id') id: string, @Body() dto: Partial<UpdateCategoryDto>) {
    return await this.categoriesService.patchUpdateCategory(+id, dto);
  }

  //DELETE
  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoriesService.deleteCategory(+id);
  }
}
