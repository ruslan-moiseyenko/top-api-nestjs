import { IsEnum } from 'class-validator';
import { TopLevelCategory } from 'src/top-page/top-page.model/top-page.model';

export class FindTopPageDto {
	@IsEnum(TopLevelCategory)
	firstCategory: TopLevelCategory;
}
