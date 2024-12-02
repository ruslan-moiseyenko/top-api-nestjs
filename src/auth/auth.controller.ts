import {
	BadRequestException,
	Body,
	Controller,
	HttpCode,
	Post,
	UsePipes,
	ValidationPipe,
} from '@nestjs/common';
import { AUTH_MESSAGES } from 'src/auth/auth.constants';
import { AuthService } from 'src/auth/auth.service';
import { AuthDto } from 'src/auth/dto/auth.dto';

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@UsePipes(new ValidationPipe())
	@Post('register')
	async register(@Body() dto: AuthDto) {
		const oldUser = await this.authService.findUser(dto.login);

		if (oldUser) {
			throw new BadRequestException(AUTH_MESSAGES.USER_ALREADY_EXISTS);
		}

		return await this.authService.createUser(dto);
	}

	@UsePipes(new ValidationPipe())
	@HttpCode(200)
	@Post('login')
	async login(@Body() dto: AuthDto) {
		const { email } = await this.authService.validateUser(
			dto.login,
			dto.password,
		);

		return await this.authService.login(email);
	}
}
