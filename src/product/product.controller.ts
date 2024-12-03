import {
	Body,
	Controller,
	Delete,
	Get,
	HttpCode,
	NotFoundException,
	Param,
	Patch,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { FindProductDto } from 'src/product/dto/find-product.dto';
import { PRODUCT_MESSAGES } from 'src/product/product.constants';
import { ProductService } from 'src/product/product.service';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Post('create')
	async create(@Body() dto: CreateProductDto) {
		return this.productService.create(dto);
	}

	@Get(':id ')
	async get(@Param('id') id: string) {
		const product = this.productService.findById(id);

		if (!product) {
			throw new NotFoundException(PRODUCT_MESSAGES.NOT_FOUND);
		}

		return product;
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedProduct = this.productService.deleteById(id);

		if (!deletedProduct) {
			throw new NotFoundException(PRODUCT_MESSAGES.NOT_FOUND);
		}
	}

	@Patch(':id')
	async update(@Param('id') id: string, @Body() dto: CreateProductDto) {
		const updatedProduct = this.productService.updateById(id, dto);

		if (!updatedProduct) {
			throw new NotFoundException(PRODUCT_MESSAGES.NOT_FOUND);
		}

		return updatedProduct;
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindProductDto) {
		return this.productService.findWithReviews(dto);
	}
}
