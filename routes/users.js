import express from "express";
import { UserInterests, UserNotInterests, getDetails, getUpdate, userLogin, userLogout, userRegister } from "../controllers/user.js";
import isAuthenticated from "../middleware/isAuthenticated.js"

const router = express.Router();

router.post("/login",userLogin);
router.post("/register",userRegister);
router.get("/me",isAuthenticated,getDetails)
router.get("/logout",isAuthenticated,userLogout)
router.put("/:id",isAuthenticated,getUpdate)
router.route("/interest/:id").put(isAuthenticated,UserInterests).delete(isAuthenticated,UserNotInterests)


export default router;