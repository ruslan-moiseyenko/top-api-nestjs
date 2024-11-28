export enum TopLevelCategory {
	Courses,
	Services,
	Books,
	Products,
}

export class TopPageModel {
	_id: string;
	firstLevelCategories: TopLevelCategory;
	secondLevelCategories: string;
	pageTitle: string;
	pageCategory: string;
	showcase?: {
		count: number;
		juniorSalary: number;
		middleSalary: number;
		seniorSalary: number;
	};
	advantages: {
		title: string;
		description: string;
		v;
	}[];
	seoText: string;
	tags: string[];
	tagsTitle?: string;
}
