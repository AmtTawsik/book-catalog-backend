import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { reviewFilterableFields } from './review.constant';
import { IReview } from './review.interface';
import { ReviewServices } from './review.services';

const createReview: RequestHandler = catchAsync(async (req, res) => {
  const review = req.body;
  const userId = req.user?.userId;
  const result = await ReviewServices.createReviewToDB(review, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Review created successfully',
    data: result,
  });
});

const getAllReview: RequestHandler = catchAsync(async (req, res, next) => {
  const filters = pick(req.query, reviewFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ReviewServices.getAllReviewFromDB(
    filters,
    paginationOptions
  );

  if (result.data.length === 0) {
    return next(new ApiError('No reviews found!', httpStatus.NOT_FOUND));
  }

  sendResponse<IReview[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Review retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

export const ReviewController = {
  createReview,
  getAllReview,
};
