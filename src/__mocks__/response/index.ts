import { apiRoutes } from "@/libs/apiRoutes";

import recipe from "./recipe.json";
import recipes from "./recipes.json";

export const response = {
  [apiRoutes.recipe.recipes]: recipes,
  [apiRoutes.recipe.recipe]: recipe,
};

export default response;
