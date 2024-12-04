import {
	Body,
	Controller,
	Delete,
	Get,
	HttpException,
	HttpStatus,
	Param,
	Post,
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
// import { UserEmail } from 'src/decorators/user-email.decorator';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { REVIEW_ERRORS } from 'src/review/review.constants';
import { ReviewService } from 'src/review/review.service';

@Controller('review')
export class ReviewController {
	constructor(private readonly reviewService: ReviewService) {}

	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateReviewDto) {
		return this.reviewService.create(dto);
	}

	@UseGuards(JwtAuthGuard) //check if user is authorized
	@Get('byProduct/:productId')
	async getByProduct(@Param('productId', IdValidationPipe) id: string) {
		return this.reviewService.findByProductId(id);
	}

	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = await this.reviewService.delete(id);

		if (!deletedDoc) {
			throw new HttpException(REVIEW_ERRORS.NOT_FOUND, HttpStatus.NOT_FOUND);
		}
	}
}
