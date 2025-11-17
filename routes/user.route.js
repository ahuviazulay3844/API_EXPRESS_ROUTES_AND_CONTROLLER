import { Router } from "express";
import {sign_in,sign_up,getAllUsers} from  "../controllers/user.controller.js";
import { joiValidator } from "../middlewares/joi-validator.middleware.js"; 
import { validateUser } from "../models/user.model.js";
const router = Router();
router.post('/sign_up', joiValidator(validateUser.register), sign_up);
router.post('/sign_in', joiValidator(validateUser.login), sign_in);
router.get('/', getAllUsers);


export default router;