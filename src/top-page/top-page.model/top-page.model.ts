/* eslint-disable @typescript-eslint/no-unsafe-declaration-merging */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import { index, prop } from '@typegoose/typegoose';
import { Base, TimeStamps } from '@typegoose/typegoose/lib/defaultClasses';

export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class ShowcaseData {
	@prop()
	count: number;

	@prop()
	juniorSalary: number;

	@prop()
	middleSalary: number;

	@prop()
	seniorSalary: number;
}

export class TopPageAdvantage {
	@prop()
	title: string;

	@prop()
	description: string;
}

export interface TopPageModel extends Base {}

@index({
	'$**': 'text', //text search on all fields
})
export class TopPageModel extends TimeStamps {
	@prop({ enum: TopLevelCategory })
	firstLevelCategories: TopLevelCategory;

	@prop()
	secondLevelCategories: string;

	@prop()
	pageTitle: string;

	@prop({ unique: true })
	alias: string;

	@prop()
	pageCategory: string;

	@prop({ type: () => ShowcaseData })
	showcase?: ShowcaseData;

	@prop({ type: () => [TopPageAdvantage] })
	advantages: TopPageAdvantage[];

	@prop()
	seoText: string;

	@prop({ type: () => [String] })
	tags: string[];

	@prop()
	tagsTitle?: string;
}
