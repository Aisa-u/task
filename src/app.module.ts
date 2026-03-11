import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { FilesModule } from './files/files.module';
import { ExcelModule } from './excel/excel.module';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot( { isGlobal: true } ),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        autoLoadEntities: true,
        synchronize: true,
      }),
      inject: [ConfigService]
    }),

    ServeStaticModule.forRoot({
      rootPath: join(__dirname, 'static'),
    }),

    CategoriesModule,
    ProductsModule,
    FilesModule,
    ExcelModule,

  ],
})
export class AppModule {}
