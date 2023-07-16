import { Schema, model } from 'mongoose';
import { IWishlist, WishlistModel } from './wishlist.interface';

const wishlistSchema = new Schema<IWishlist, WishlistModel>(
  {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'Book',
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Wishlist = model<IWishlist, WishlistModel>(
  'Wishlist',
  wishlistSchema
);
