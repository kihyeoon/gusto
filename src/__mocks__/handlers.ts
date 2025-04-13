import response from "@/__mocks__/response";
import { HttpResponse, http } from "msw";

import { apiRoutes } from "@/libs/api-routes";

const API_DOMAIN = "http://localhost:3000";

export const handlers = [
  ...[apiRoutes.recipe.recipes, apiRoutes.recipe.recipe].map((path) =>
    http.get(`${API_DOMAIN}${path}`, () =>
      HttpResponse.json(response[path], {
        status: 200,
      }),
    ),
  ),
];
