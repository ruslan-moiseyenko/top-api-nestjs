import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CreateReviewDto } from 'src/review/dto/create-review.dto';
import { Types, disconnect } from 'mongoose';
import { REVIEW_ERRORS } from 'src/review/review.constants';

const productId = new Types.ObjectId().toHexString();

const testDto: CreateReviewDto = {
	name: 'Test',
	title: 'Test Title',
	description: 'Test Description',
	rating: 0,
	productId,
};

describe('AppController (e2e)', () => {
	let app: INestApplication;
	let createdId: string;

	beforeEach(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();

		app = moduleFixture.createNestApplication();
		await app.init();
	});

	it('/review/create  (POST)', async () => {
		const { body } = await request(app.getHttpServer())
			.post('/review/create')
			.send(testDto)
			.expect(201);

		createdId = body._id;
		expect(createdId).toBeDefined();
	});

	it('/review/byProduct/:productId (GET) - success', async () => {
		const { body } = await request(app.getHttpServer())
			.get('/review/byProduct/' + productId)
			.expect(200);

		expect(body.length).toBe(1);
	});

	it('/review/byProduct/:productId (GET) - fail', async () => {
		const { body } = await request(app.getHttpServer())
			.get('/review/byProduct/' + new Types.ObjectId().toHexString()) //fake productId
			.expect(200);

		expect(body.length).toBe(0);
	});

	it('/review/:id (DELETE) - success', () => {
		return request(app.getHttpServer())
			.delete('/review/' + createdId)
			.expect(200);
	});

	it('/review/:id (DELETE) - fail', () => {
		return request(app.getHttpServer())
			.delete('/review/' + new Types.ObjectId().toHexString()) //fake productId
			.expect(404, {
				statusCode: 404,
				message: REVIEW_ERRORS.NOT_FOUND,
			});
	});

	afterAll(async () => {
		disconnect();
		await app.close();
	});
});
