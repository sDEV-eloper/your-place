import express from "express";
import { createList } from "../controllers/listController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router()

router.post('/create-list', verifyToken, createList)

export default router;