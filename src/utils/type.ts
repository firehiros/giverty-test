import { RecipeEntity } from "@apps/entities/giverty.entity"

export type ApiResponse = {
    message: string;
    recipe: RecipeEntity[];
}