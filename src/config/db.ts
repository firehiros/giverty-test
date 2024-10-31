import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

config();

export const typeOrmConfig: TypeOrmModule = {
  type: 'sqlite',
  database: '.db',
  entities: [`${__dirname}/../../**/*.entity.{js,ts}`],
  synchronize: true,
  logging: true,
};
