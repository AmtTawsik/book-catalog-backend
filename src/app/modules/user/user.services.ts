/* eslint-disable @typescript-eslint/no-explicit-any */
import { SortOrder } from 'mongoose';
import { PaginationHelpers } from '../../../helper/paginationHelpers';
import {
  GenericResponseType,
  PaginationOptionType,
} from '../../../interface/common';
import { userSearchableFields } from './user.constant';
import { UserFilterType, UserType } from './user.interface';
import { User } from './user.model';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';

const getAllUsers = async (
  filters: UserFilterType,
  paginationOptions: PaginationOptionType
): Promise<GenericResponseType<UserType[]>> => {
  const { searchTerm, ...filtersData } = filters;
  const andCondition = [];

  // Generating partial search mechanism
  if (searchTerm) {
    andCondition.push({
      $or: userSearchableFields.map(field => ({
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
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
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

  // It ensures that if andCondition is empty thant send empty object otherwise it will occurs an error
  const whereConditions = andCondition.length > 0 ? { $and: andCondition } : {};

  // It queries the User collection, sorts the results based on the sortConditions, skips the specified number of documents, and limits the number of documents to retrieve.
  const result = await User.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  // It retrieves the total count of users using the User.countDocuments function.
  const total = await User.countDocuments(whereConditions);

  // It returns a Promise that resolves to a GenericResponseType containing the retrieved users and the pagination metadata.
  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleUser = async (id: string): Promise<UserType | null> => {
  // Use the User model's findById method to query the database for the user with the specified ID
  const result = await User.findById(id);
  console.log('result', result);
  // Return the result, which can be either the retrieved user or null if not found
  return result;
};

const updateSingleUser = async (
  id: string,
  payload: Partial<UserType>
): Promise<UserType | null> => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<UserType> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true, // Return the updated document
    runValidators: true, // Run validators during the update operation
  });

  return result;
};

const deleteSingleUser = async (id: string): Promise<UserType | null> => {
  // Query the database to update the academic semester by its ID
  const result = await User.findByIdAndDelete(id);

  // Return the updated academic semester, or null if not found
  return result;
};

// my profile section
const getMyprofile = async (id: string): Promise<UserType | null> => {
  // Use the User model's findById method to query the database for the user with the specified ID
  const result = await User.findById(id);
  console.log('result', result);
  // Return the result, which can be either the retrieved user or null if not found
  return result;
};

const updateMyprofile = async (
  id: string,
  payload: Partial<UserType>
): Promise<UserType | null> => {
  const isExist = await User.findById(id);

  if (!isExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found!');
  }

  const { name, ...userData } = payload;

  const updatedUserData: Partial<UserType> = { ...userData };

  if (name && Object.keys(name).length > 0) {
    Object.keys(name).forEach(key => {
      const nameKey = `name.${key}`;
      (updatedUserData as any)[nameKey] = name[key as keyof typeof name];
    });
  }

  const result = await User.findOneAndUpdate({ _id: id }, updatedUserData, {
    new: true, // Return the updated document
    runValidators: true, // Run validators during the update operation
  });

  return result;
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  // my profile section
  updateMyprofile,
  getMyprofile,
};
