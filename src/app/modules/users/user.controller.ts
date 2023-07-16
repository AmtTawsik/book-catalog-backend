import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IUser } from './user.interface';
import { UserServices } from './user.services';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const user = req.body;
  const result = await UserServices.createUserToDB(user);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Users created successfully',
    data: result,
  });
});

const getAllUsers: RequestHandler = catchAsync(async (req, res, next) => {
  const result = await UserServices.getAllUsersFromDB();

  if (result.length === 0) {
    return next(new ApiError('No Users found!', httpStatus.NOT_FOUND));
  }

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Users retrived successfully',
    data: result,
  });
});

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await UserServices.loginUser(loginData);

  const { ...others } = result;

  sendResponse<ILoginUserResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'User logged in successfully',
    data: others,
  });
});

export const UserController = {
  getAllUsers,
  createUser,
  loginUser,
};
