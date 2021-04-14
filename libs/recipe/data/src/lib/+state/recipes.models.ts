export interface RecipeIngredient {
  ingredientId: string;
  quantity: number;
  unit: string;
}

/**
 * Interface for the 'Recipes' data
 */
export interface Recipe {
  id: string; // Primary ID
  name: string;
  ingredients: RecipeIngredient[]
}

export type EditableRecipe = Omit<Recipe, "id" | "ingredients">;
