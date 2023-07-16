import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import config from '../../../config';
import { IUser, UserModel } from './user.interface';

export const userSchema = new Schema<IUser, UserModel>(
  {
    userName: {
      type: String,
      required: true,
    },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: function (doc, ret) {
        delete ret.password;
        return ret;
      },
    },
  }
);

// static methods
userSchema.statics.isUserExist = async function isUserExist(
  email: string
): Promise<IUser | null> {
  const user = await User.findOne(
    { email },
    { _id: 1, password: 1, role: 1, id: 1, email: 1, userName: 1 }
  );
  return user;
};

userSchema.statics.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string
): Promise<boolean> {
  const isMatched = await bcrypt.compare(givenPassword, savedPassword);
  return isMatched;
};

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    // Only hash the password if it's being created or modified
    return next();
  }

  // Hash the password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds)
  );

  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
