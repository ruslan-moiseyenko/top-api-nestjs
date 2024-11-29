import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
} from '@nestjs/common';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { REVIEW_ERRORS } from 'src/review/review.constants';
import { ReviewService } from 'src/review/review.service';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') id: string) {
		return this.reviewService.findByProductId(id);
	}

	@Delete(':id')
	async delete(@Param('id') id: string) {
		const deletedDoc = await this.reviewService.delete(id);

		if (!deletedDoc) {
			throw new HttpException(REVIEW_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}
}
