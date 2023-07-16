import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';
import ApiError from '../../../errors/ApiError';
import { jwtHelpers } from '../../../helpers/jwtHelplers';
import { ILoginUser, ILoginUserResponse, IUser } from './user.interface';
import { User } from './user.model';

const createUserToDB = async (user: IUser): Promise<IUser> => {
  const result = await User.create(user);
  return result;
};

const getAllUsersFromDB = async (): Promise<IUser[]> => {
  const result = await User.find();

  return result;
};

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { email, password } = payload;

  // check user exist
  const isUserExist = await User.isUserExist(email);

  if (!isUserExist) {
    throw new ApiError('User does not exist', httpStatus.NOT_FOUND);
  } else if (
    // match password
    isUserExist.password &&
    !(await User.isPasswordMatched(password, isUserExist.password))
  ) {
    throw new ApiError('Password is incorrect', httpStatus.UNAUTHORIZED);
  } else {
    // create access token
    const { id: userId, role, email, userName } = isUserExist;

    const accessToken = jwtHelpers.createToken(
      { userId, role, email },
      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    return {
      userId,
      email,
      userName,
      role,
      accessToken,
    };
  }
};

export const UserServices = {
  getAllUsersFromDB,
  createUserToDB,
  loginUser,
};
