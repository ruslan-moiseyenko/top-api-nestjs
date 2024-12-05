import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateTopPageDto } from 'src/top-page/dto/create-top-page.dto';
import {
	TopLevelCategory,
	TopPageModel,
} from 'src/top-page/top-page.model/top-page.model';

@Injectable()
export class TopPageService {
	constructor(
		@InjectModel(TopPageModel.name)
		private readonly topPageModel: Model<TopPageModel>,
	) {}

	async create(dto: CreateTopPageDto) {
		return this.topPageModel.create(dto);
	}

	async findById(id: string) {
		return await this.topPageModel.findById(id).exec();
	}

	async findByAlias(alias: string) {
		return await this.topPageModel.findOne({ alias }).exec();
	}

	async deleteById(id: string) {
		return this.topPageModel.findByIdAndDelete({ _id: id }).exec();
	}

	async updateById(id: string, dto: Partial<CreateTopPageDto>) {
		return this.topPageModel
			.findByIdAndUpdate({ _id: id }, dto, { new: true })
			.exec();
	}

	async findByCategory(firstCategory: TopLevelCategory) {
		return this.topPageModel
			.find(
				{ firstLevelCategories: firstCategory },
				{ alias: 1, secondLevelCategories: 1, title: 1 },
			)
			.exec();
	}
}
