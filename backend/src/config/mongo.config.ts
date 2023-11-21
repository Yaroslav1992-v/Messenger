import { ConfigService } from '@nestjs/config';
import { MongooseModuleOptions } from '@nestjs/mongoose';

export const getMongoConfig = async (
  configService: ConfigService,
): Promise<MongooseModuleOptions> => {
  return {
    uri: getMongoString(configService),
    ...getMongoOptions(),
  };
};

const getMongoOptions = () => ({
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const getMongoString = (configService: ConfigService): string => {
  return (
    'mongodb+srv://' +
    configService.get('MONGO_LOGIN') +
    ':' +
    configService.get('MONGO_PASSWORD') +
    '@cluster0.1iojuwe.mongodb.net/?retryWrites=true&w=majority'
  );
};
