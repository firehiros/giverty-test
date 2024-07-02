import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

config();

export const typeOrmConfig: TypeOrmModule = {
  type: 'postgres',
  host: process.env.POSTGRESQL_HOST,
  port: process.env.POSTGRESQL_PORT,
  username: process.env.POSTGRESQL_USERNAME,
  password: process.env.POSTGRESQL_PASSWORD,
  database: process.env.POSTGRESQL_DATABASE_NAME,
  entities: [`${__dirname}/../../**/*.entity.{js,ts}`],
  synchronize: true,
  logging: true,
};

console.log('DEBUG typeOrmConfig', typeOrmConfig);
