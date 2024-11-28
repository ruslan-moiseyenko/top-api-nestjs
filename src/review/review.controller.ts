import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ReviewModel } from 'src/review/review.model/review.model';

@Controller('review')
export class ReviewController {
	@Post('create')
	async create(@Body() dto: Omit<ReviewModel, '_id'>) {}

	@Get('byProduct/:productId')
	async getByProduct(@Param('productId') id: string) {}

	@Delete(':id')
	async delete(@Param('id') id: string) {}
}
