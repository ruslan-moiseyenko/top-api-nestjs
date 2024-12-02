import { ModelType } from '@typegoose/typegoose/lib/types';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from 'src/auth/auth.model/user.model';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { InjectModel } from 'nestjs-typegoose';
import { genSalt, hash, compare } from 'bcryptjs';
import { AUTH_MESSAGES } from 'src/auth/auth.constants';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(UserModel) private readonly userModel: ModelType<UserModel>,
		private readonly jwtService: JwtService,
	) {}

	async createUser(dto: AuthDto) {
		const salt = await genSalt(10);
		const newUser = new this.userModel({
			email: dto.login,
			passwordHash: await hash(dto.password, salt),
		});

		return newUser.save();
	}

	async findUser(email: string): Promise<UserModel | null> {
		return this.userModel.findOne({ email }).exec();
	}

	async validateUser(
		email: string,
		password: string,
	): Promise<Pick<UserModel, 'email'>> {
		const user = await this.findUser(email);

		if (!user) {
			throw new UnauthorizedException(AUTH_MESSAGES.USER_NOT_FOUND);
		}

		const isPasswordCorrect = await compare(password, user.passwordHash);

		if (!isPasswordCorrect) {
			throw new UnauthorizedException(AUTH_MESSAGES.INCORRECT_PASSWORD);
		}
		return { email: user.email };
	}

	async login(email: string) {
		const payload = { email };
		return {
			access_token: await this.jwtService.signAsync(payload),
		};
	}
}
