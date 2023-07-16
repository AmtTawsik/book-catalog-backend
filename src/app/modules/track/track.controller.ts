import { RequestHandler } from 'express';
import httpStatus from 'http-status';
import { paginationFields } from '../../../constants/paginationFields';
import ApiError from '../../../errors/ApiError';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { ITrack } from './track.interface';
import { TrackServices } from './track.services';

const createTrack: RequestHandler = catchAsync(async (req, res) => {
  const track = req.body;
  const userId = req.user?.userId;
  const result = await TrackServices.createTrackToDB(track, userId);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Book added to the tracklist successfully',
    data: result,
  });
});

const getAllTrack: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.user?.userId;
  const paginationOptions = pick(req.query, paginationFields);

  const result = await TrackServices.getAllTrackFromDB(id, paginationOptions);

  if (result.data.length === 0) {
    return next(new ApiError('No tracked books found!', httpStatus.NOT_FOUND));
  }

  sendResponse<ITrack[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Tracked books retrived successfully',
    meta: result.meta,
    data: result.data,
  });
});

const deleteTrack: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user?.userId;

  const result = await TrackServices.deleteTrackFromDB(id, userId);

  if (!result) {
    return next(
      new ApiError(
        `No book found from your added tracked list with this id`,
        httpStatus.NOT_FOUND
      )
    );
  }

  sendResponse<ITrack>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Book deleted successfully from track list!',
    data: result,
  });
});

const updateTrack: RequestHandler = catchAsync(async (req, res, next) => {
  const id = req.params.id;
  const userId = req.user?.userId;

  const updatedData = req.body;

  const result = await TrackServices.updateTrackToDB(id, userId, updatedData);

  if (!result) {
    return next(new ApiError(`No tracked Book found with this ID`, 404));
  }

  sendResponse<ITrack>(res, {
    statusCode: httpStatus.OK,
    success: true,
    status: 'success',
    message: 'Tracked book updated successfully',
    data: result,
  });
});

export const TrackController = {
  createTrack,
  getAllTrack,
  deleteTrack,
  updateTrack,
};
