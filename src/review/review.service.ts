import { Injectable } from '@nestjs/common';
import { DocumentType, ModelType } from '@typegoose/typegoose/lib/types';
import { isValidObjectId } from 'mongoose';
import { InjectModel } from 'nestjs-typegoose';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { ReviewModel } from 'src/review/review.model/review.model';

@Injectable()
export class ReviewService {
	constructor(
		@InjectModel(ReviewModel)
		private readonly reviewModel: ModelType<ReviewModel>,
	) {}
	async create(dto: CreateReviewDto): Promise<DocumentType<ReviewModel>> {
		return this.reviewModel.create(dto);
	}

	async delete(id: string): Promise<DocumentType<ReviewModel> | null> {
		return this.reviewModel.findByIdAndDelete(id).exec();
	}

	async findByProductId(
		productId: string,
	): Promise<DocumentType<ReviewModel>[]> {
		//check for valid id type
		if (isValidObjectId(productId)) {
			return this.reviewModel.find({ productId }).exec();
		} else {
			return [];
		}
	}

	async deleteAllByProductId(productId: string) {
		return this.reviewModel.deleteMany({ productId }).exec();
	}
}
