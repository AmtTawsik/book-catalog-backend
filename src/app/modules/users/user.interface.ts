/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { ENUM_USER_ROLE } from '../../../enums/users';

export type IUser = {
  userName: string;
  email: string;
  password: string;
  role: string;
  id?: string;
};

// instance methods
export type IUserMethods = {
  isUserExist(email: string): Promise<Partial<IUser> | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
};

// static methods
export interface UserModel
  extends Model<IUser, Record<string, never>, IUserMethods> {
  isUserExist(email: string): Promise<IUser | null>;
  isPasswordMatched(
    givenPassword: string,
    savedPassword: string
  ): Promise<boolean>;
}

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  userId?: string;
  accessToken: string;
  email?: string;
  userName?: string;
  role?: string;
};

export type IVerifiedLoginUser = {
  userId: string;
  role: ENUM_USER_ROLE;
};
