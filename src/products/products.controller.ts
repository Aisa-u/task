import { Controller, UploadedFile, UseInterceptors } from '@nestjs/common';
import { Get, Post, Put, Patch, Delete, Param, Body, Res} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ProductsService } from './products.service';
import { CreateProductDto } from 'src/dto/create-product.dto';
import { UpdateProductDto } from 'src/dto/update-product.dto';
import { ExcelService } from 'src/excel/excel.service';
import * as express from 'express'


@Controller('products')
export class ProductsController {
  constructor(
    private readonly productsService: ProductsService,
    private excelService: ExcelService
  ) {}

  //EXPORT
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
  @Get('all')
  async getAllProducts() {
    return await this.productsService.getAllProducts()
  }

  //GET BY ID
  @Get(':id')
  async getProductById(@Param('id') id: string) {
    return await this.productsService.getProductById(+id)
  }

  //POST
  @Post()
  @UseInterceptors(FileInterceptor('image'))
  async createProduct(@Body() dto: CreateProductDto, @UploadedFile() image) {
    return await this.productsService.createProduct(dto, image)
  }

  //PUT
  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    return await this.productsService.updateProduct(+id, dto)
  }

  //PATCH
  @Patch(':id')
  async patchUpdateProduct(@Param('id') id: string, @Body() dto: Partial<UpdateProductDto>) {
    return await this.productsService.patchUpdateProduct(+id, dto)
  }

  //DELETE
  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return await this.productsService.deleteProduct(+id)
  }
}
