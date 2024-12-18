import { Module } from '@nestjs/common';
import { TopPageController } from './top-page.controller';
import { TopPageModel } from 'src/top-page/top-page.model/top-page.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { TopPageService } from './top-page.service';

@Module({
	controllers: [TopPageController],
	imports: [
		TypegooseModule.forFeature([
			{
				typegooseClass: TopPageModel,
				schemaOptions: {
					collection: 'TopPage',
				},
			},
		]),
	],
	providers: [TopPageService],
	exports: [TopPageService],
})
export class TopPageModule {}
