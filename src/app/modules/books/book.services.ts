import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { IGenericPaginationResponse } from '../../../interfaces/genericPaginationResponse';
import { IpaginationOptions } from '../../../interfaces/paginationOptions';
import { findFilterConditions } from '../../../shared/findFilterConditions';
import { bookSearchableFields } from './book.constant';
import { IBook, IBookFilters } from './book.interface';
import { Book } from './book.model';

const createBookToDB = async (userId: string, book: IBook): Promise<IBook> => {
  if (!userId) {
    throw new ApiError(`You are not authorized`, 401);
  }
  book.addedBy = userId;
  const createBook = (await Book.create(book)).populate('addedBy');
  return createBook;
};

const getAllBookFromDB = async (
  filters: IBookFilters,
  paginationOptions: IpaginationOptions
): Promise<IGenericPaginationResponse<IBook[]>> => {
  const { searchTerm, ...filtersData } = filters;

  const andConditions = findFilterConditions(
    searchTerm,
    filtersData,
    bookSearchableFields
  );

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const whereConditions =
    andConditions.length > 0 ? { $and: andConditions } : {};

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  const result = await Book.find(whereConditions)
    .populate('addedBy')
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

const getSingleBookFromDB = async (
  id: string
): Promise<IBook | null | undefined> => {
  const result = (await Book.findById(id))?.populate('addedBy');
  return result;
};

const updateSingleBookToDB = async (
  id: string,
  userId: string,
  updatedData: Partial<IBook>
): Promise<IBook | null | undefined> => {
  const book = await Book.findOne({ _id: id, addedBy: userId });

  if (!book) {
    throw new ApiError(`No Book found with this ID from your added books`, 404);
  } else {
    const result = (
      await Book.findOneAndUpdate({ _id: id }, updatedData, {
        new: true,
      })
    )?.populate('addedBy');

    return result;
  }
};

const deleteBookFromDB = async (
  id: string,
  userId: string
): Promise<IBook | null> => {
  const book = await Book.findOne({ _id: id, addedBy: userId });

  if (!book) {
    throw new ApiError(`No Book found with this ID from your added books`, 404);
  } else {
    const result = await Book.findByIdAndDelete(id);
    return result;
  }
};

export const BookServices = {
  createBookToDB,
  getAllBookFromDB,
  getSingleBookFromDB,
  updateSingleBookToDB,
  deleteBookFromDB,
};
