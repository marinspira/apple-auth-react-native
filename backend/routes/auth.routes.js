import express from "express"
import { signInWithApple, logout } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signInWithApple", signInWithApple)

router.post("/logout", logout)

export default router