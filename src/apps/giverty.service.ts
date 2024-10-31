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

@Injectable()
export class GivertyService implements OnModuleInit {
  constructor(
    @InjectRepository(RecipeEntity)
    private recipeRepo: Repository<RecipeEntity>,
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
      return {
        message: 'Recipe creation failed!',
        required: 'title, making_time, serves, ingredients, cost'
      }
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

      query.orderBy('recipes.id', 'ASC');

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
      throw new HttpException({
        message: "Bad Request"
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async find(id: number) {
    try {
      const recipe = await this.recipeRepo.findOneBy({ id })

      if (!recipe)
        throw new HttpException(
          {
            message: "No recipe found"
          },
          HttpStatus.BAD_REQUEST,
        );

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
      throw new HttpException({
        message: "Bad Request"
      }, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: number, param: any) {
    try {
      const isFound = await this.recipeRepo.findOneBy({ id });

      if (!isFound)
        throw new HttpException(
          {message: "No recipe found" },
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
    } catch (e: any) {
      throw new HttpException({
        message: "Recipe update failed"
      }, HttpStatus.BAD_REQUEST);
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
    } catch (e: any) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
