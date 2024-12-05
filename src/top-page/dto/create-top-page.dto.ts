import { Type } from 'class-transformer';
import {
	IsArray,
	IsEnum,
	IsNumber,
	IsOptional,
	IsString,
	ValidateNested,
} from 'class-validator';
import { TopLevelCategory } from 'src/top-page/top-page.model/top-page.model';

export class ShowcaseDataDTO {
	@IsNumber()
	count: number;

	@IsNumber()
	juniorSalary: number;

	@IsNumber()
	middleSalary: number;

	@IsNumber()
	seniorSalary: number;
}

export class TopPageAdvantageDTO {
	@IsString()
	title: string;

	@IsString()
	description: string;
}

export class CreateTopPageDto {
	@IsEnum(TopLevelCategory)
	firstLevelCategories: TopLevelCategory;

	@IsString()
	secondLevelCategories: string;

	pageTitle: string;

	@IsString()
	alias: string;

	@IsString()
	pageCategory: string;

	@IsOptional()
	@Type(() => ShowcaseDataDTO)
	showcase?: ShowcaseDataDTO;

	@IsArray()
	@ValidateNested()
	@Type(() => TopPageAdvantageDTO)
	advantages: TopPageAdvantageDTO[];

	@IsString()
	seoText: string;

	@IsArray()
	@IsString({ each: true })
	tags: string[];

	@IsOptional()
	@IsString({ each: true })
	tagsTitle?: string;
}
