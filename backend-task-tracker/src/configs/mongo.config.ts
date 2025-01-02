import { ConfigService } from '@nestjs/config';

export const getMongoConfig = async (configService: ConfigService) => {
  return {
    uri: getMongoUri(configService),
    ...getMongoOptions(),
  };
};

const getMongoUri = (configService: ConfigService) =>
  'mongodb://' +
  configService.get('DB_HOST') +
  ':' +
  configService.get('DB_PORT') +
  '/' +
  configService.get('DB_NAME');

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});
