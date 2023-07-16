import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { BookType } from './book.interface';
import { BookService } from './book.services';
import pick from '../../../shared/pick';
import { bookFilterableField } from './book.constant';
import { paginationFields } from '../../../constants/pagination';
import ApiError from '../../../errors/ApiError';
import { UserService } from '../user/user.services';
import { User } from '../user/user.model';

const createNewBookController: RequestHandler = catchAsync(async (req, res) => {
  const { ...bookData } = req.body;
  bookData.seller = req?.auth?._id;
  const result = await BookService.createBook(bookData);

  return sendResponse<BookType>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Book created successfully',
    meta: null,
    data: result,
  });
});

const getAllBooksController: RequestHandler = catchAsync(async (req, res) => {
  // for filtering according to query
  const filters = pick(req.query, bookFilterableField);

  // pagination
  const paginationOptions = pick(req.query, paginationFields);

  // original service call
  const result = await BookService.getAllBooks(filters, paginationOptions);

  // sending response according to filter and pagination
  return sendResponse<BookType[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getBookByIdController: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  // original service call
  const result = await BookService.getSingleBook(id);

  // scallable response sending according to req
  return sendResponse<BookType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book retrieved successfully',
    meta: null,
    data: result,
  });
});

const updateBookByIdController: RequestHandler = catchAsync(
  async (req, res) => {
    // data retrieval according to req
    const id = req.params.id;
    const updatedData = req.body;

    // original service call
    if (req?.auth?.role === 'seller') {
      // get the BookInfo
      const BookInfo = await BookService.getSingleBook(id);
      console.log('book', BookInfo);
      console.log('author', req.auth._id);

      if (BookInfo?.seller.toString() !== req?.auth?._id) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not the seller');
      }
    }

    const result = await BookService.updateSingleBook(id, updatedData);
    // scallable response sending according to req
    return sendResponse<BookType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book updated successfully',
      meta: null,
      data: result,
    });
  }
);

const deleteBookByIdController: RequestHandler = catchAsync(
  async (req, res) => {
    // data retrieval according to req
    const id = req.params.id;

    if (req?.auth?.role === 'seller') {
      // get the BookInfo
      const BookInfo = await BookService.getSingleBook(id);

      if (BookInfo?.seller.toString() !== req?.auth?._id) {
        throw new ApiError(httpStatus.FORBIDDEN, 'You are not the seller');
      }
    }

    // original service call
    const result = await BookService.deleteSingleBook(id);

    // scallable response sending according to req
    return sendResponse<BookType>(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: 'Book delete successfully',
      meta: null,
      data: result,
    });
  }
);

export const BookController = {
  createNewBookController,
  getAllBooksController,
  getBookByIdController,
  updateBookByIdController,
  deleteBookByIdController,
};
