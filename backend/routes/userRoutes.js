import express from 'express';
import { notAllowed } from "../utils/notAllowed.js";
import { changePassword, getUser, loginUser, registerUser, updateProfile } from '../controllers/userController.js';
import { checkUser } from '../middleware/checkUser.js';

const router = express.Router();

router.route('/api/users/login')
    .post(loginUser)
    .all(notAllowed);

router.route('/api/users/register')
    .post(registerUser)
    .all(notAllowed);

router.route('/api/users')
    .get(checkUser, getUser)
    .patch(checkUser, updateProfile)
    .all(notAllowed);

router.route('/api/users/change-password')
    .patch(checkUser, changePassword)
    .all(notAllowed);

router.route('/api/user/:id')
.patch(updateProfile)
.all(notAllowed);



export default router;

