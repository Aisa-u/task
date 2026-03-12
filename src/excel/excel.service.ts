import { Injectable } from '@nestjs/common';
import * as ExcelJs from 'exceljs'
import { Category } from 'src/entities/category.entity';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ExcelService {
    async exportProducts(products: Product[]) {
        const workbook = new ExcelJs.Workbook()
        const worksheet = workbook.addWorksheet("Products")

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 5 },
            { header: 'Name', key: 'name', width: 25 },
            { header: 'Description', key: 'description', width: 25 },
            { header: 'Price', key: 'price' },
            { header: 'CategoryName', key: 'category' },
        ];

        products.forEach(product => {
            worksheet.addRow({
                id: product.id,
                name: product.name,
                description: product.description,
                price: product.price,
                category: product.category?.name
            })
        })

        return workbook
    }

    async exportCategories(categories: Category[]) {
        const workbook = new ExcelJs.Workbook()
        const worksheet = workbook.addWorksheet("Categories")

        worksheet.columns = [
            { header: 'Id', key: 'id', width: 10 },
            { header: 'Name', key: 'name', width: 10 },
            { header: 'Description', key: 'description', width: 25 }
        ]

        categories.forEach(category => {
            worksheet.addRow({
                id: category.id,
                name: category.name,
                description: category.description
            })
        })

        return workbook
    }
}
