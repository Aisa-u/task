import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Category } from '../entities/category.entity';
import { ExcelService } from 'src/excel/excel.service';
import * as express from 'express'

@ApiTags("Категории")
@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService, 
    private excelService: ExcelService
  ) {}

  //EXPORT
  @ApiOperation({summary: "Экспорт в Excel"})
  @Get('export')
  async exportCategories(@Res() res: express.Response) {

    const categories = await this.categoriesService.getAllCategories()

    const workbook = await this.excelService.exportCategories(categories)

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=categories.xlsx'
    )

    await workbook.xlsx.write(res)

    res.end()

    return true
  }

  //GET
  @ApiOperation({summary: "Получить все категории"})
  @ApiResponse({status: 200, type: Category})
  @Get('all')
  async getAllCategories() {
    return await this.categoriesService.getAllCategories();
  }

  //GET BY ID
  @ApiOperation({summary: "Получить данные одной категории по id"})
  @ApiResponse({status: 200, type: Category})
  @Get(':id')
  async getCategoryById(@Param('id') id: string) {
    return await this.categoriesService.getCategoryById(+id);
  }

  //POST
  @ApiOperation({summary: "Создать категорию"})
  @ApiResponse({status: 200, type: Category})
  @Post() 
  async createCategory(@Body() dto: CreateCategoryDto) {
    return await this.categoriesService.createCategory(dto);
  }

  //PUT
  @ApiOperation({summary: "Изменить категорию полностью"})
  @ApiResponse({status: 200, type: Category})
  @Put(':id')
  async updateCategory(@Param('id') id: string, @Body() dto: UpdateCategoryDto) {
    return await this.categoriesService.updateCategory(+id, dto);
  }

  //PATCH
  @ApiOperation({summary: "Изменить категорию частично"})
  @ApiResponse({status: 200, type: Category})
  @Patch(':id')
  async patchUpdateCategory(@Param('id') id: string, @Body() dto: Partial<UpdateCategoryDto>) {
    return await this.categoriesService.patchUpdateCategory(+id, dto);
  }

  //DELETE
  @ApiOperation({summary: "Удалить категорию по id"})
  @ApiResponse({status: 200, type: Category})
  @Delete(':id')
  async deleteCategory(@Param('id') id: string) {
    return await this.categoriesService.deleteCategory(+id);
  }
}
