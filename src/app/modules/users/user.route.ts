import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { UserController } from './user.controller';
import { createUserZodSchema, userLoginZodSchema } from './users.validation';

const router = express.Router();

router.post(
  '/signup',
  validateRequest(createUserZodSchema),
  UserController.createUser
);

router.post(
  '/login',
  validateRequest(userLoginZodSchema),
  UserController.loginUser
);

router.get('/', auth(ENUM_USER_ROLE.USER), UserController.getAllUsers);

export default router;
