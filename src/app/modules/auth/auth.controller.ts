import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import sendResponse from '../../../shared/sendResponse';
import catchAsync from '../../../shared/catchAsync';
import { UserType } from '../user/user.interface';
import { AuthService } from './auth.services';
import config from '../../../config';

const createUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...userData } = req.body;

  const result = await AuthService.createUser(userData);

  // Generic function for the dynamic response sender to assure response format
  return sendResponse<UserType>(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    meta: null,
    data: result,
  });
});

const loginUser: RequestHandler = catchAsync(async (req, res) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User lohggedin successfully !',
    meta: null,
    data: others,
  });
});

const refreshToken: RequestHandler = catchAsync(async (req, res) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User lohggedin successfully !',
    meta: null,
    data: result,
  });
});

export const AuthController = {
  createUser,
  loginUser,
  refreshToken,
};
