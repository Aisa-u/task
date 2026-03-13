import { IsString, IsNumber } from 'class-validator'

export class UpdateProductDto {
  @IsString()
  name: string

  @IsString()
  description: string

  @IsNumber()
  price: number

  @IsString()
  image: string

  categoryId: number
}
