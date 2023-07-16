import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import { UserController } from './user.controller';
import auth from '../../middleware/auth';
const router = express.Router();

router.patch(
  '/:id',
  auth('admin'),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUserById
);

router.get('/:id', auth('admin'), UserController.getUser);

router.delete('/:id', auth('admin'), UserController.deleteUserById);

router.get('/', auth('admin'), UserController.getAllUsers);

// my profile section
router.patch(
  '/my-profile',
  auth('seller', 'buyer'),
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateMyprofile
);

router.get('/my-profile', auth('seller', 'buyer'), UserController.getMyprofile);

export const UserRoutes = router;
