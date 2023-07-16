import { Schema, model } from 'mongoose';
import { status } from './track.constant';
import { ITrack, TrackModel } from './track.interface';

const trackSchema = new Schema<ITrack, TrackModel>(
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
    status: {
      type: String,
      enum: status,
      default: 'notStarted',
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

export const Track = model<ITrack, TrackModel>('Track', trackSchema);
