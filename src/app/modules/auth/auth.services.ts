import bcrypt from 'bcrypt';

import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { UserType } from '../user/user.interface';
import { User } from '../user/user.model';
import { jwtHelpers } from '../../../helper/jwtHelpers';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';

const createUser = async (user: UserType): Promise<UserType | null> => {
  const salt = await bcrypt.genSalt(10);
  const encryptedPassword = await bcrypt.hash(user?.password, salt);
  user.password = encryptedPassword;
  // const existedEmail = await User.findOne({ email: user?.email });
  const allUsers = await User.find({});
  const existedPassword = allUsers.find(
    async element => await bcrypt.compare(element?.password, user?.password)
  );
  if (existedPassword) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Password has to be unique');
  }
  // if (existedEmail) {
  //   throw new ApiError(httpStatus.NOT_FOUND, 'phoneNumer error');
  // }
  const result = await User.create(user);

  return result;
};

const loginUser = async (payload: any) => {
  const isUserExist = await User.findOne({ email: payload?.email });
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Email error');
  }
  if (!(await bcrypt.compare(payload.password, isUserExist.password))) {
    throw new ApiError(httpStatus.NOT_FOUND, 'password error');
  }

  //create access token & refresh token

  const { _id, role } = isUserExist;
  const accessToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { _id, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expires_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (token: string) => {
  //verify token
  // invalid token - synchronous
  let verifiedToken = null;
  try {
    verifiedToken = jwtHelpers.verifyToken(
      token,
      config.jwt.refresh_secret as Secret
    );
  } catch (err) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid Refresh Token');
  }

  const { phoneNumber } = verifiedToken;

  // tumi delete hye gso  kintu tumar refresh token ase
  // checking deleted user's refresh token

  const isUserExist = await User.findOne(phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User does not exist');
  }
  //generate new token

  const newAccessToken = jwtHelpers.createToken(
    {
      id: isUserExist.id,
      role: isUserExist.role,
    },
    config.jwt.secret as Secret,
    config.jwt.expires_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  createUser,
  loginUser,
  refreshToken,
};
