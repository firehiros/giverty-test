import {
  HttpException,
  HttpStatus,
  Injectable,
  OnModuleInit,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

// Entity
import { RecipeEntity } from './entities/giverty.entity';
import { ApiResponse } from '@utils/type';

@Injectable()
export class GivertyService implements OnModuleInit {
  constructor(
    @InjectRepository(RecipeEntity) private recipeRepo: Repository<RecipeEntity>,
  ) {}

  async onModuleInit() {
    try {
    } catch (ex) {
      console.error(ex);
    }
  }

  async create(dto: any) {
    try {
      const recipe = await this.recipeRepo.save({
        ...dto,
      });

      return {
        message: 'Recipe successfully created!',
        recipe: [{
          id: recipe.id,
          title: recipe.title,
          making_time: recipe.making_time,
          serves: recipe.serves,
          ingredients: recipe.ingredients,
          cost: recipe.cost,
        }]
      };
    } catch (e) {
      const error = {
        message: 'Recipe creation failed!',
        required: 'title, making_time, serves, ingredients, cost'
      }

      return error
      // throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async list() {
    try {

      const query = this.recipeRepo.createQueryBuilder('recipes');

      query.select([
        'recipes.id',
        'recipes.title',
        'recipes.making_time',
        'recipes.serves',
        'recipes.ingredients',
        'recipes.cost',
      ]);

      query.orderBy('users.id', 'ASC');

      const transactions = await query.getMany();

      return {
        recipes: transactions.map((recipe: any) => {
          return {
            id: recipe.id,
            title: recipe.id,
            making_time: recipe.making_time,
            serves: recipe.serves,
            ingredients: recipe.ingredients,
            cost: recipe.cost,
          };
        }) as RecipeEntity[],
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async find(id: number) {
    try {
      const recipe = await this.recipeRepo.findOne({ where: { id } })

      return {
        message: "Recipe details by id",
        recipe: [{
          id: recipe.id,
          title: recipe.title,
          making_time: recipe.making_time,
          serves: recipe.serves,
          ingredients: recipe.ingredients,
          cost: recipe.cost,
        }]
      };
    } catch (e) {
      throw new HttpException('Error', HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, param: any) {
    try {
      const isFound = await this.recipeRepo.findOneBy({ id });

      if (!isFound)
        throw new HttpException(
          "No recipe found",
          HttpStatus.BAD_REQUEST,
        );

      const recipe = await this.recipeRepo.save({
        id,
        ...param,
      });

      return {
        message: "Recipe successfully updated!",
        recipe: [{
          id: recipe.id,
          title: recipe.title,
          making_time: recipe.making_time,
          serves: recipe.serves,
          ingredients: recipe.ingredients,
          cost: recipe.cost,
        }]
      };
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async remove(id: number) {
    try {
      const isFound = await this.recipeRepo.findOneBy({ id });

      if (!isFound)
        throw new HttpException(
          "No recipe found",
          HttpStatus.BAD_REQUEST,
        );
      
      await this.recipeRepo.delete(id);

      return {
        message: "Recipe successfully removed!"
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
