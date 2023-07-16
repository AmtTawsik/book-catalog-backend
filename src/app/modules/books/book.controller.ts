import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { bookFilterableFields } from './book.constant';
import { IBook } from './book.interface';
import { BookServices } from './book.services';

const createBook: RequestHandler = catchAsync(async (req, res) => {
  const userId = req.user?.userId;
  const book = req.body;
  const result = await BookServices.createBookToDB(userId, book);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Book created successfully',
    data: result,
  });
});

const getAllBook: RequestHandler = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, bookFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await BookServices.getAllBookFromDB(
    filters,
    paginationOptions
  );

  if (result.data.length === 0) {
    return next(new ApiError('No Books found!', httpStatus.NOT_FOUND));
  }

  sendResponse<IBook[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Book retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getSingleBook: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const result = await BookServices.getSingleBookFromDB(id);

  if (!result) {
    return next(
      new ApiError(`No Book found with this ${id} id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Book retrived successfully',
    data: result,
  });
});

const updateBook: RequestHandler = catchAsync(async (req, res, next) => {
  const bookId = req.params.id;
  const userId = req.user?.userId;

  const updatedData = req.body;

  const result = await BookServices.updateSingleBookToDB(
    bookId,
    userId,
    updatedData
  );

  if (!result) {
    return next(new ApiError(`No Book found with this ID`, 404));
  }

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Book updated successfully',
    data: result,
  });
});

const deleteBook: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user?.userId;

  const result = await BookServices.deleteBookFromDB(id, userId);

  if (!result) {
    return next(
      new ApiError(`No Book found with this ${id} id`, httpStatus.NOT_FOUND)
    );
  }

  sendResponse<IBook>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Book deleted successfully !',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook,
};
