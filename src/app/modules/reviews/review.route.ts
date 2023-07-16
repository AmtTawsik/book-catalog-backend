import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { ReviewController } from './review.controller';
import { createReviewZodSchema } from './review.validation';

const router = express.Router();

router.post(
  '/',
  validateRequest(createReviewZodSchema),
  auth(ENUM_USER_ROLE.USER),
  ReviewController.createReview
);

router.get('/', auth(ENUM_USER_ROLE.USER), ReviewController.getAllReview);

export default router;
