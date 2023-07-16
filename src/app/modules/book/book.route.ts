import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { BookController } from './book.controller';
import auth from '../../middleware/auth';
import { BookValidation } from './book.validation';
const router = express.Router();

router.post(
  '/',
  /* auth('seller'), */
  validateRequest(BookValidation.createBookZodSchema),
  BookController.createNewBookController
);

router.get(
  '/:id',
  /* auth('admin', 'seller', 'buyer'), */
  BookController.getBookByIdController
);

router.patch(
  '/:id',
  /* auth('seller'), */
  validateRequest(BookValidation.updateBookZodSchema),
  BookController.updateBookByIdController
);

router.delete(
  '/:id',
  /* auth('seller'), */ BookController.deleteBookByIdController
);

router.get(
  '/',
  /* auth('admin', 'seller', 'buyer'), */
  BookController.getAllBooksController
);

export const BookRoutes = router;
