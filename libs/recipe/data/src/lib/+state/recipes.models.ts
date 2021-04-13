export interface RecipeIngredient {
  ingredientId: string;
  quantity: number;
  unit: string;
}

/**
 * Interface for the 'Recipes' data
 */
export interface RecipesEntity {
  id: string; // Primary ID
  name: string;
  ingredients: RecipeIngredient[]
}
