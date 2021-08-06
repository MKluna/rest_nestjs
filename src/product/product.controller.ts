import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/product.dto';
import {
  Controller,
  Post,
  Get,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    try {
      return await this.productService.createProduct(createProductDTO);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
