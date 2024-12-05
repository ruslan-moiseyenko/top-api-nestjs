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
	UseGuards,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { IdValidationPipe } from 'src/pipes/id-validation.pipe';
import { CreateTopPageDto } from 'src/top-page/dto/create-top-page.dto';
import { FindTopPageDto } from 'src/top-page/dto/find-top-page.dto';
import { TOP_PAGE_MESSAGES } from 'src/top-page/top-page.constants';
import { TopPageModel } from 'src/top-page/top-page.model/top-page.model';
import { TopPageService } from 'src/top-page/top-page.service';

@Controller('top-page')
export class TopPageController {
	constructor(private readonly topPageService: TopPageService) {}

	@UseGuards(JwtAuthGuard) //check if user is authorized
	@UsePipes(new ValidationPipe())
	@Post('create')
	async create(@Body() dto: CreateTopPageDto) {
		return this.topPageService.create(dto);
	}

	@Get(':id')
	async get(@Param('id', IdValidationPipe) id: string) {
		const topPage = this.topPageService.findById(id);
		if (!topPage) {
			throw new NotFoundException(TOP_PAGE_MESSAGES.NOT_FOUND);
		}
		return topPage;
	}

	@UseGuards(JwtAuthGuard)
	@Get('byAlias/:alias')
	async getByAlias(@Param('alias') alias: string) {
		const topPage = this.topPageService.findByAlias(alias);
		if (!topPage) {
			throw new NotFoundException(TOP_PAGE_MESSAGES.NOT_FOUND);
		}
		return topPage;
	}

	@UseGuards(JwtAuthGuard)
	@Delete(':id')
	async delete(@Param('id', IdValidationPipe) id: string) {
		const deletedDoc = this.topPageService.deleteById(id);

		if (!deletedDoc) {
			throw new NotFoundException(TOP_PAGE_MESSAGES.NOT_FOUND);
		}
	}

	@UseGuards(JwtAuthGuard)
	@Patch(':id')
	async update(
		@Param('id', IdValidationPipe) id: string,
		@Body() dto: Partial<TopPageModel>,
	) {
		const updatedDoc = this.topPageService.updateById(id, dto);
		if (!updatedDoc) {
			throw new NotFoundException(TOP_PAGE_MESSAGES.NOT_FOUND);
		}
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('find')
	async find(@Body() dto: FindTopPageDto) {
		return this.topPageService.findByCategory(dto.firstCategory);
	}
}
