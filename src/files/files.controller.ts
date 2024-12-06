import {
	Controller,
	HttpCode,
	Post,
	UploadedFile,
	UseGuards,
	UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { FileElementResponse } from 'src/files/dto/file-element.response';
import { FilesService } from 'src/files/files.service';

@Controller('files')
export class FilesController {
	constructor(private readonly filesService: FilesService) {}

	@HttpCode(200)
	@UseGuards(JwtAuthGuard)
	@UseInterceptors(FileInterceptor('files'))
	@Post('upload')
	async uploadFile(
		@UploadedFile() file: Express.Multer.File,
	): Promise<FileElementResponse[]> {
		return await this.filesService.saveFiles([file]);
	}
}
