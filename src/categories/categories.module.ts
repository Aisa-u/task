import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './category.entity'
import { ExcelModule } from 'src/excel/excel.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Category]),
    ExcelModule
  ],
  controllers: [CategoriesController],
  providers: [CategoriesService],
})
export class CategoriesModule {}
