import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './product.entity';
import { FilesModule } from 'src/files/files.module';
import { ExcelModule } from 'src/excel/excel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    FilesModule,
    ExcelModule
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
