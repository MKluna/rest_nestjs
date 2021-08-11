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
  Param,
  NotFoundException,
} from '@nestjs/common';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/create')
  async createPost(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    try {
      const product = await this.productService.createProduct(createProductDTO);
      return res.status(HttpStatus.CREATED).json({
        message: 'product created successfully',
        status: HttpStatus.CREATED,
        product: product,
      });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get('/')
  async getPosts(@Res() res) {
    try {
      const products = await this.productService.getProducts();
      return res.status(HttpStatus.OK).json(products);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Get(':id')
  async getPostsById(@Param('id') id, @Res() res) {
    try {
      const product = await this.productService.getProduct(id);
      if (!product) throw new NotFoundException('Product not found');
      return res.status(HttpStatus.OK).json(product);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id,
    @Res() res,
    @Body() createProductDTO: CreateProductDTO,
  ) {
    try {
      const product = await this.productService.updateProduct(
        id,
        createProductDTO,
      );
      if (!product) throw new NotFoundException('Product not found');
      return res.status(HttpStatus.OK).json(product);
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }

  @Delete('/delete/:id')
  async deleteProduct(@Param('id') id, @Res() res) {
    try {
      const productDeleted = await this.productService.deleteProduct(id);
      if (!productDeleted) throw new NotFoundException('Product not found');
      return res
        .status(HttpStatus.OK)
        .json({ message: 'Product removed successfully' });
    } catch (error) {
      return res.status(HttpStatus.BAD_REQUEST).json(error);
    }
  }
}
