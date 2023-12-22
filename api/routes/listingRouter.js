import express from "express";
import { createList, getList, deleteList, updateList, getListData, getAllList } from "../controllers/listController.js";
import { verifyToken } from "../utils/verifyUser.js";

const router=express.Router()

router.post('/create-list', verifyToken, createList)
router.post('/get-list/:id', verifyToken,  getList)
router.delete('/delete-list/:id', verifyToken, deleteList)
router.post('/update-list/:id', verifyToken, updateList)
router.get('/get/:id',  getListData)
router.get('/get',  getAllList)

export default router;