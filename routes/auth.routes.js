import express from "express";
import restrictedToLoggedInUserOnly from "../middlewares/auth.middleware.js";
import {
    handleCreateUser,
    handleLogin,
    handleLogout,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/createuser", handleCreateUser);
router.post("/login", handleLogin);
router.post("/logout", restrictedToLoggedInUserOnly, handleLogout);
router.get("/");

export default router;
