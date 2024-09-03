import express from "express"
import { signInWithApple, logout, validateToken, authenticateToken } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/signInWithApple", signInWithApple)

router.post("/logout", logout)

router.post("/validateToken", authenticateToken, validateToken)

export default router