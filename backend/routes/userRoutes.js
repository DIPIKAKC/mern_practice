import express from 'express';
import { notAllowed } from "../utils/notAllowed.js";
import { getUsers, loginUser, registerUser } from '../controllers/userController.js';


const router = express.Router();

router.route('/api/users/login')
.post(loginUser)
.all(notAllowed);

router.route('/api/users/register')
.post(registerUser).
all(notAllowed);

router.route('/api/users')
.get(getUsers).
all(notAllowed);



export default router;

