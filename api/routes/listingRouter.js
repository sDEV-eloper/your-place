import express from "express";
import { createList, getList } from "../controllers/listController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router()

router.post('/create-list', verifyToken, createList)
router.post('/get-list/:id', verifyToken, getList)

export default router;