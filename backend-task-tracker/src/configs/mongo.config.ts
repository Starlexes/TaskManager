import { ConfigService } from '@nestjs/config';
import { TypegooseModuleOptions } from 'nestjs-typegoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<TypegooseModuleOptions> => {
  return {
    uri: getMongoUri(configService),
  };
};

const getMongoUri = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('DB_USER') +
  ':' +
  configService.get('DB_PASSWORD') +
  '@' +
  configService.get('DB_HOST') +
  ':' +
  configService.get('DB_PORT') +
  '/' +
  configService.get('DB_NAME');
