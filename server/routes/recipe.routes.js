import express from "express";
import userCtrl from "../controllers/user.controller";
import recipeCtrl from "../controllers/recipe.controller";

const router = express.Router();

router
  .route("/api/recipes")
  .get(recipeCtrl.listRecipesFeed)
  .post(recipeCtrl.create);

router.get("/api/recipes/my-recipes", recipeCtrl.listByUser);

router.get(
  "/api/recipes/photo/:recipeId",
  recipeCtrl.photo,
  recipeCtrl.defaultPhoto
);

// router.route("/api/recipes/:userId").get(recipeCtrl.listByUser);
// //.post(recipeCtrl.create);

// router
//   .route("/api/recipes/user/:recipeId")
//   .get(recipeCtrl.recipeById)
//   .patch(recipeCtrl.update)
//   .delete(recipeCtrl.remove);

//router.param("userId", userCtrl.userByID);
router.param("recipeId", recipeCtrl.recipeByID);

export default router;
