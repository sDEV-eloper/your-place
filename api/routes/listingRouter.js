import express from "express";
import { createList, getList, deleteList, updateList } from "../controllers/listController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router()

router.post('/create-list', verifyToken, createList)
router.post('/get-list/:id', verifyToken, getList)
router.delete('/delete-list/:id', verifyToken, deleteList)
router.post('/update-list/:id', verifyToken, updateList)

export default router;