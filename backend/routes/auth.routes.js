import express from "express"
import { appleAuth, logout } from "../controllers/auth.controller.js"

const router = express.Router()

router.post("/appleAuth", appleAuth)

router.post("/logout", logout)

export default router