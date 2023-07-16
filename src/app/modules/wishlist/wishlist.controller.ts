import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { IWishlist } from './wishlist.interface';
import { WishlistServices } from './wishlist.services';

const createWishlist: RequestHandler = catchAsync(async (req, res) => {
  const wishlist = req.body;
  const userId = req.user?.userId;
  const result = await WishlistServices.createWishlistToDB(wishlist, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Book added to the wishlist successfully',
    data: result,
  });
});

const getAllWishlist: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.user?.userId;
  const paginationOptions = pick(req.query, paginationFields);

  const result = await WishlistServices.getAllWishlistFromDB(
    id,
    paginationOptions
  );

  if (result.data.length === 0) {
    return next(
      new ApiError('No Wishlisted books found!', httpStatus.NOT_FOUND)
    );
  }

  sendResponse<IWishlist[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Wishlisted books retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const deleteWishlist: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user?.userId;

  const result = await WishlistServices.deleteWishlistFromDB(id, userId);

  if (!result) {
    return next(
      new ApiError(
        `No Book found from your added wishlit with this id`,
        httpStatus.NOT_FOUND
      )
    );
  }

  sendResponse<IWishlist>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Book deleted successfully from wishlist!',
    data: result,
  });
});

export const WishlistController = {
  createWishlist,
  getAllWishlist,
  deleteWishlist,
};
