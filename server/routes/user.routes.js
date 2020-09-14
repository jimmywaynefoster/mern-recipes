import express from "express";
import userCtrl from "../controllers/user.controller";

const router = express.Router();

router
  .route("/api/user")
  .get(userCtrl.readProfile)
  .delete(userCtrl.remove)
  .patch(userCtrl.update);

router.get("/api/users", userCtrl.list);

router.patch("/api/user/password", userCtrl.updatePassword);

router.get("/api/user/photo/", userCtrl.photo, userCtrl.defaultPhoto);
router.get("/api/user/defaultphoto", userCtrl.defaultPhoto);

export default router;
