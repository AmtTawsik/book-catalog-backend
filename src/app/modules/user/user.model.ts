import { Schema, model } from 'mongoose';
import { UserType, UserModel } from './user.interface';
import { role } from './user.constant';

// schema definition for the users
const userSchema = new Schema<UserType, UserModel>(
  {
    role: {
      type: String,
      required: [true, 'role is missing!'],
      enum: {
        values: role,
        message: '{VALUE} is not matched',
      },
    },
    name: {
      type: {
        firstName: {
          type: String,
          required: [true, 'first name is missing!'],
        },
        lastName: {
          type: String,
          required: [true, 'last name is missing!'],
        },
      },
      required: [true, 'name is missing!'],
    },
    password: {
      type: String,
      unique: true,
      required: [true, 'password is missing!'],
    },
    email: {
      type: String,
      unique: true,
      required: [true, 'phone number is missing!'],
    },
    address: {
      type: String,
      required: [true, 'address is missing!'],
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

// Create and export the User model based on the user schema
export const User = model<UserType, UserModel>('User', userSchema);
