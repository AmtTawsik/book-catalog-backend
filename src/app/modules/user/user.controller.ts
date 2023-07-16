import { RequestHandler } from 'express';
import { UserType } from './user.interface';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { UserService } from './user.services';
import pick from '../../../shared/pick';
import { userFilterableField } from './user.constant';
import { paginationFields } from '../../../constants/pagination';

const getAllUsers: RequestHandler = catchAsync(async (req, res) => {
  // filteration
  const filters = pick(req.query, userFilterableField);

  // pagination
  const paginationOptions = pick(req.query, paginationFields);

  // original service call
  const result = await UserService.getAllUsers(filters, paginationOptions);

  // scallable response sending according to req
  return sendResponse<UserType[]>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'Users retrieved successfully',
    meta: result.meta,
    data: result.data,
  });
});

const getUser: RequestHandler = catchAsync(async (req, res) => {
  const id = req.params.id;

  // original service call
  const result = await UserService.getSingleUser(id);

  // scallable response sending according to req
  return sendResponse<UserType>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'User retrieved successfully',
    meta: null,
    data: result,
  });
});

const updateUserById: RequestHandler = catchAsync(async (req, res) => {
  // data retrieval according to req
  const id = req.params.id;
  const updatedData = req.body;

  // original service call
  const result = await UserService.updateSingleUser(id, updatedData);

  // scallable response sending according to req
  return sendResponse<UserType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    meta: null,
    data: result,
  });
});

const deleteUserById: RequestHandler = catchAsync(async (req, res) => {
  // data retrieval according to req
  const id = req.params.id;

  // original service call
  const result = await UserService.deleteSingleUser(id);

  // scallable response sending according to req
  return sendResponse<UserType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User delete successfully',
    meta: null,
    data: result,
  });
});

// my profile section
const updateMyprofile: RequestHandler = catchAsync(async (req, res) => {
  // data retrieval according to req
  const id = req?.auth?._id;
  const updatedData = req.body;

  // original service call
  const result = await UserService.updateSingleUser(id, updatedData);

  // scallable response sending according to req
  return sendResponse<UserType>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    meta: null,
    data: result,
  });
});

const getMyprofile: RequestHandler = catchAsync(async (req, res) => {
  const id = req?.auth?._id;

  // original service call
  const result = await UserService.getSingleUser(id);

  // scallable response sending according to req
  return sendResponse<UserType>(res, {
    statusCode: httpStatus.FOUND,
    success: true,
    message: 'User retrieved successfully',
    meta: null,
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getUser,
  updateUserById,
  deleteUserById,
  getMyprofile,
  updateMyprofile,
};
