import { Router } from "express";
import { users } from "../db1";

const router = Router();
router.post('/sign_up', sign_up);
router.post('/sign_in', sign_in);
router.get('/', getAllUsers);


export default users.route