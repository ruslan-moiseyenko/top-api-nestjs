import { TopLevelCategory } from 'src/top-page/top-page.model/top-page.model';

type RouteMapType = Record<TopLevelCategory, string>;

export const CATEGORY_URL: RouteMapType = {
	[TopLevelCategory.Books]: '/books',
	[TopLevelCategory.Courses]: '/courses',
	[TopLevelCategory.Products]: '/products',
	[TopLevelCategory.Services]: '/services',
};
