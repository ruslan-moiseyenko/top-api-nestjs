import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';
export const GetMongoConfig = async (
	configService: ConfigService,
): Promise<TypegooseModuleOptions> => ({
	uri: getMongoString(configService),
});

function getMongoString(configService: ConfigService) {
	return `mongodb://${configService.get('MONGO_LOGIN')}:${configService.get(
		'MONGO_PASSWORD',
	)}@${configService.get('MONGO_HOST')}:${configService.get('MONGO_PORT')}/${configService.get(
		'MONGO_AUTHDATABASE',
	)}`;
}
