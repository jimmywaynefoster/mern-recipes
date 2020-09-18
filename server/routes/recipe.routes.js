import express from "express";
import userCtrl from "../controllers/user.controller";
import recipeCtrl from "../controllers/recipe.controller";

const router = express.Router();

router
  .route("/api/recipes")
  .get(recipeCtrl.listRecipesFeed)
  .post(recipeCtrl.create);

router.get("/api/recipes/my-recipes", recipeCtrl.listByUser);

router.get("/api/recipes/:recipeId", recipeCtrl.recipeById);

router.get(
  "/api/recipes/photo/:recipeId",
  recipeCtrl.photo,
  recipeCtrl.defaultPhoto
);

router.param("recipeId", recipeCtrl.recipeByID);

export default router;
