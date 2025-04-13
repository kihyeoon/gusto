import { apiRoutes } from "@/libs/api-routes";

import recipe from "./recipe.json";
import recipes from "./recipes.json";

export const response = {
  [apiRoutes.recipe.recipes]: recipes,
  [apiRoutes.recipe.recipe]: recipe,
};

export default response;
