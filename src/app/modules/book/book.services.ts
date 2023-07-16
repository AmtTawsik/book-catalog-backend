import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helper/paginationHelpers';
import {
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { bookSearchableFields } from './book.constant';
import { BookFilterType, BookType } from './book.interface';
import { Book } from './book.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { User } from '../user/user.model';

const createBook = async (book: BookType): Promise<BookType | null> => {
  const isSellerExist = await User.findById(book.seller);
  if (!isSellerExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found!');
  }
  const result = await Book.create(book);

  return result;
};

const getAllBooks = async (
  filters: BookFilterType,
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<BookType[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  // Generating partial search mechanism
  if (searchTerm) {
    andCondition.push({
      $or: bookSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // Generating filter search mechanism
  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => {
        // if (field === 'maxPrice') {
        //   return {
        //     price: { $lte: value },
        //   };
        // } else if (field === 'minPrice') {
        //   return {
        //     price: { $gte: value },
        //   };
        // }
        // return {
        //   [field]: value
        // }
        return {
          [field === 'maxPrice' || field === 'minPrice' ? 'price' : field]:
            field === 'maxPrice'
              ? { $lte: value }
              : field === 'minPrice'
              ? { $gte: value }
              : value,
        };
      }),
    });
  }

  // It calculates the pagination parameters such as page, limit, skip, sortBy, and sortOrder using the PaginationHelpers.calculationPagination function.
  const { page, limit, skip, sortBy, sortOrder } =
    PaginationHelpers.calculationPagination(paginationOptions);

  // It initializes an empty object sortConditions to hold the sorting conditions.
  const sortConditions: { [key: string]: SortOrder } = {};

  // If sortBy and sortOrder are provided, it assigns them to the sortConditions object.
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  const result = await Book.find(whereConditions)

    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Book.countDocuments(whereConditions);

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleBook = async (id: string): Promise<BookType | null> => {
  const result = await Book.findById(id);

  return result;
};

const updateSingleBook = async (
  id: string,
  payload: Partial<BookType>
): Promise<BookType | null> => {
  const isExist = await Book.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Book not found!');
  }

  if (payload?.seller) {
    const isSellerExist = await User.findById(payload.seller);
    if (!isSellerExist) {
      throw new ApiError(httpStatus.NOT_FOUND, 'Seller not found!');
    }
  }

  const { ...bookData } = payload;

  const updatedBookData: Partial<BookType> = { ...bookData };

  const result = await Book.findOneAndUpdate({ _id: id }, updatedBookData, {
    new: true, // Return the updated document
    runValidators: true, // Run validators during the update operation
  });

  return result;
};

const deleteSingleBook = async (id: string): Promise<BookType | null> => {
  const result = await Book.findByIdAndDelete(id);

  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
