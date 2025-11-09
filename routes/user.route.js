import { Router } from "express";
import {sign_in,sign_up,getAllUsers} from  "../controllers/user.controller.js";

const router = Router();
router.post('/sign_up', sign_up);
router.post('/sign_in', sign_in);
router.get('/', getAllUsers);


export default router;