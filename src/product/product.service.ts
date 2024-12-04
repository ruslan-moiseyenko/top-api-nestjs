import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateProductDto } from 'src/product/dto/create-product.dto';
import { FindProductDto } from 'src/product/dto/find-product.dto';
import { ProductModel } from 'src/product/product.model/product.model';
import { ReviewModel } from 'src/review/review.model/review.model';

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

	async findWithReviews(dto: FindProductDto): Promise<
		(ProductModel & {
			review: ReviewModel[];
			reviewCount: number;
			reviewAvg: number;
		})[]
	> {
		return this.productModel
			.aggregate([
				{
					$match: {
						categories: dto.category,
					},
				},
				{
					$sort: {
						//to get the same sorting order every time
						_id: 1,
					},
				},
				{
					$limit: dto.limit,
				},
				{
					$lookup: {
						from: 'Review',
						localField: '_id',
						foreignField: 'productId',
						as: 'reviews',
					},
				},
				{
					$addFields: {
						reviewCount: { $size: '$reviews' },
						reviewAvg: { $avg: '$reviews.rating' },
						reviews: {
							$function: {
								body: 'function (reviews) { return reviews.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) }', //sort from newest to oldest
								args: ['$reviews'],
								lang: 'js',
							},
						},
					},
				},
			])
			.exec();
	}
}
