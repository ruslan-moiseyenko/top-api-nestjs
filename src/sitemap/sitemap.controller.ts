import { TopPageService } from 'src/top-page/top-page.service';
import { Controller, Get, Header } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Builder } from 'xml2js';
import { format, subDays } from 'date-fns';
import { CATEGORY_URL } from 'src/sitemap/sitemap.constants';

@Controller('sitemap')
export class SitemapController {
	domain: string;
	constructor(
		private readonly topPageService: TopPageService,
		private readonly configService: ConfigService,
	) {
		this.domain = this.configService.get('DOMAIN') ?? 'https://test.com';
	}

	@Get('xml')
	@Header('content-type', 'text/xml')
	async getSitemap() {
		const dateFormat = "yyyy-MM-dd'T'HH:mm:00.000xxx";
		let res = [
			{
				loc: `${this.domain}`,
				lastmod: format(subDays(new Date(), 1), dateFormat),
				changefreq: 'daily',
				priority: 1,
			},
		];

		const allPages = await this.topPageService.findAll();

		res = res.concat(
			allPages.map((page) => {
				return {
					loc: `${this.domain}${CATEGORY_URL[page.firstLevelCategories]}/${page.alias}`,
					lastmod: format(
						new Date(page.updatedAt ?? page.createdAt),
						dateFormat,
					),
					changefreq: 'weekly',
					priority: 0.7,
				};
			}),
		);

		const builder = new Builder({
			xmldec: { version: '1.0', encoding: 'UTF-8' },
		});

		return builder.buildObject({
			urlset: {
				$: {
					xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9',
				},
				url: res,
			},
		});
	}
}
