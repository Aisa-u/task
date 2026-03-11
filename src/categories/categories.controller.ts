import { Controller, Get, Post, Put, Patch, Delete, Param, Body, Res } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { UpdateCategoryDto } from 'src/dto/update-category.dto';
import { ExcelService } from 'src/excel/excel.service';
import * as express from 'express'

@Controller('categories')
export class CategoriesController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private excelService: ExcelService 
  ) {}

  //EXPORT
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
