import { config } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecipeEntity } from '@apps/entities/giverty.entity';

config();

export const typeOrmConfig: TypeOrmModule = {
  type: 'sqlite',
  database: 'database.sqlite',
  entities: [RecipeEntity],
  synchronize: true,
  logging: true,
};