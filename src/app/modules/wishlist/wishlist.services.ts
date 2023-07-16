import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { IWishlist } from './wishlist.interface';
import { Wishlist } from './wishlist.model';

const createWishlistToDB = async (
  wishlist: IWishlist,
  userId: string
): Promise<IWishlist> => {
  wishlist.user = userId;

  const book = await Wishlist.findOne({ book: wishlist.book, user: userId });

  if (!book) {
    const createWishlist = (
      await (await Wishlist.create(wishlist)).populate('book')
    ).populate('user');
    return createWishlist;
  } else {
    throw new ApiError(`This book already in wishlist`, 404);
  }
};

const deleteWishlistFromDB = async (
  id: string,
  userId: string
): Promise<IWishlist | null> => {
  const book = await Wishlist.findOne({ _id: id, user: userId });

  if (!book) {
    throw new ApiError(
      `No Book found with this ID from your wishlisted books`,
      404
    );
  } else {
    const result = await Wishlist.findByIdAndDelete(id);
    return result;
  }
};

const getAllWishlistFromDB = async (
  id: string,
  paginationOptions: IpaginationOptions
): Promise<IGenericPaginationResponse<IWishlist[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Wishlist.find({ user: id })
    .populate('book')
    .populate('user')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = result.length;

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const WishlistServices = {
  createWishlistToDB,
  getAllWishlistFromDB,
  deleteWishlistFromDB,
};
