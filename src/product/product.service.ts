import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { ProductModel } from 'src/product/product.model/product.model';

@Injectable()
export class ProductService {
	constructor(
		@InjectModel(ProductModel.name)
		private readonly productModel: Model<ProductModel>,
	) {}

	async create(dto: CreateProductDto) {
		return this.productModel.create(dto);
	}

	async findById(id: string) {
		return this.productModel.findById(id).exec();
	}

	async deleteById(id: string) {
		return this.productModel.findOneAndDelete({ _id: id }).exec();
	}

	async updateById(id: string, dto: CreateProductDto) {
		return this.productModel
			.findOneAndUpdate({ _id: id }, dto, { new: true }) //new: true - return updated doc
			.exec();
	}
}
