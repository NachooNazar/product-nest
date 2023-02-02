import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  HttpStatus,
  Body,
  Param,
  NotFoundException,
} from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

  constructor(private readonly productService:ProductService){}
  @Get()
  async findAll(@Res() res) {
    return res.status(HttpStatus.OK).json({products: await this.productService.getProducts()});
  }

  @Get('/:productId')
  async findOne(@Res() res,@Param('productId') productId){
    const product = await this.productService.getProduct(productId);
      if(!product) throw new NotFoundException('Product Does not exists');
      return res.status(HttpStatus.OK).json(product);
  }
  
  @Post('/create')
  async create(@Res() res, @Body() createProductDTO: CreateProductDTO) {
    return res.status(HttpStatus.OK).json(await this.productService.createProduct(createProductDTO));
  }

  @Put('/edit/:productId')
  async update(@Res() res, @Param('productId') productId, @Body() createProductDTO: CreateProductDTO){
    const product = await this.productService.updateProduct(productId,createProductDTO);
    if(!product) throw new NotFoundException('Product Does not exists');
    return res.status(HttpStatus.OK).json(product);
  }

  @Delete('/delete/:productId')
  async delete(@Res() res, @Param('productId') productId){
    const product = await this.productService.deleteProduct(productId);
    if(!product) throw new NotFoundException('Product Does not exists');
    return res.status(HttpStatus.OK).json(product);
  }
}
