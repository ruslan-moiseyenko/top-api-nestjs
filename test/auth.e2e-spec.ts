import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';

import { AppModule } from 'src/app.module';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { disconnect } from 'mongoose';

describe('AuthController (e2e)', () => {
	let app: INestApplication;

	const loginDto: AuthDto = {
		login: 'rus1@gmail.com',
		password: 'pas',
	};

	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/auth/login (POST) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/auth/login')
			.send(loginDto)
			.expect(200);

		expect(body.access_token).toBeDefined();
	});

	it('/auth/login (POST) - fail/login', async () => {
		await request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, login: 'test@df.df' })
			.expect(401);
	});

	it('/auth/login (POST) - fail/password', async () => {
		await request(app.getHttpServer())
			.post('/auth/login')
			.send({ ...loginDto, password: '123' })
			.expect(401);
	});

	afterAll(async () => {
		disconnect();
		await app.close();
	});
});
