import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { BookController } from './book.controller';
import { createBookZodSchema, updateBookZodSchema } from './book.validation';

const router = express.Router();

router.get('/:id', BookController.getSingleBook);

router.patch(
  '/:id',
  validateRequest(updateBookZodSchema),
  auth(ENUM_USER_ROLE.USER),
  BookController.updateBook
);

router.delete('/:id', auth(ENUM_USER_ROLE.USER), BookController.deleteBook);

router.post(
  '/',
  validateRequest(createBookZodSchema),
  auth(ENUM_USER_ROLE.USER),
  BookController.createBook
);

router.get('/', BookController.getAllBook);

export default router;
