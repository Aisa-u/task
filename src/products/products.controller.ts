import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Get, Post, Put, Patch, Delete, Param, Body, Res} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ExcelService } from 'src/excel/excel.service';
import * as express from 'express'


@ApiTags("Товары")
@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private excelService: ExcelService
  ) {}

  //EXPORT
  @ApiOperation({summary: "Экспорт в Excel"})
  @Get('export')
  async exportProducts(@Res() res: express.Response) {
    const products = await this.productsService.getAllProducts()
  
    const workbook = await this.excelService.exportProducts(products)

    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    )

    res.setHeader(
      'Content-Disposition',
      'attachment; filename=products.xlsx'
    )

    await workbook.xlsx.write(res)

    res.end()
  }

  //GET ALL
  @ApiOperation({summary: "Получить все товары"})
  @ApiResponse({status: 200, type: Product})
  @Get('all')
  async getAllProducts() {
    return await this.productsService.getAllProducts()
  }

  //GET BY ID
  @ApiOperation({summary: "Получить один товар по id"})
  @ApiResponse({status: 200, type: Product})
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productsService.getProductById(+id)
  }

  //POST
  @ApiOperation({summary: "Создать товар"})
  @ApiResponse({status: 200, type: Product})
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(@Body() dto: CreateProductDto, @UploadedFile() image) {
    return await this.productsService.createProduct(dto, image)
  }

  //PUT
  @ApiOperation({summary: "Изменить товар полностью"})
  @ApiResponse({status: 200, type: Product})
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return await this.productsService.updateProduct(+id, dto)
  }

  //PATCH
  @ApiOperation({summary: "Изменить товар частично"})
  @ApiResponse({status: 200, type: Product})
  @Patch(':id')
  async patchUpdateProduct(@Param('id') id: string, @Body() dto: Partial<UpdateProductDto>) {
    return await this.productsService.patchUpdateProduct(+id, dto)
  }

  //DELETE
  @ApiOperation({summary: "Удалить товар по id"})
  @ApiResponse({status: 200, type: Product})
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(+id)
  }
}
