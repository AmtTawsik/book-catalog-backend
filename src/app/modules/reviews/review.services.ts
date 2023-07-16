import { SortOrder } from 'mongoose';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { reviewSearchableFields } from './review.constant';
import { IReview, IReviewFilters } from './review.interface';
import { Review } from './review.model';

const createReviewToDB = async (
  review: IReview,
  userId: string
): Promise<IReview> => {
  review.userId = userId;
  const createReview = (
    await (await Review.create(review)).populate('book')
  ).populate('userId');
  return createReview;
};

const getAllReviewFromDB = async (
  filters: IReviewFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericPaginationResponse<IReview[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filtersData,
    reviewSearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Review.find(whereConditions)
    .populate('book')
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Review.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const ReviewServices = {
  createReviewToDB,
  getAllReviewFromDB,
};
