import express from 'express'
import { signin, signup,  phoneAuth } from '../controllers/authController.js';

const router = express.Router();

router.post('/signup', signup)
router.post('/signin', signin)
router.post('/phone', phoneAuth)


export default router;
