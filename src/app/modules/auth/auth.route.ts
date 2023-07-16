import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from '../user/user.validation';
import { AuthController } from './auth.controller';
import { AuthValidation } from './auth.validation';
const router = express.Router();

// signup for the new users
router.post(
  '/signup',
  validateRequest(UserValidation.createUserZodSchema),
  AuthController.createUser
);
router.post(
  '/login',
  validateRequest(UserValidation.userLoginZodSchema),
  AuthController.loginUser
);
router.post(
  '/refresh-token',
  validateRequest(AuthValidation.refreshTokenZodSchema),
  AuthController.refreshToken
);

export const AuthRoutes = router;
