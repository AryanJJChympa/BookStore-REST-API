import { login, signup } from "../controllers/userController";

import express from "express"

const router = express.Router();

router.post("/signup", signup)
router.post("/login", login)
