import express from "express";
import passport from "passport";
import authCtrl from "../controllers/auth.controller";

const router = express.Router();

router.post("/auth/register", (req, res) => {
  authCtrl.register(req, res);
});

router.post("/auth/login", (req, res, next) => {
  authCtrl.login(req, res, next);
});

router.get("/auth/logout", authCtrl.logout);

router.get("/auth/user-authenticated", authCtrl.isUserAuthenticated);

//Google
router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/my-recipies-app",
  passport.authenticate("google", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/my-recipes");
  }
);

//Facebook
router.get(
  "/auth/facebook",
  passport.authenticate("facebook", { scope: ["email"] })
);

router.get(
  "/auth/facebook/my-recipies-app",
  passport.authenticate("facebook", { failureRedirect: "/login" }),
  function (req, res) {
    // Successful authentication, redirect home.
    res.redirect("/my-recipes");
  }
);

export default router;
