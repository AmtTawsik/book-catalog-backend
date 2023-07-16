import express from 'express';
import { ENUM_USER_ROLE } from '../../../enums/users';
import auth from '../../middlewares/auth';
import { validateRequest } from '../../middlewares/validateRequest';
import { TrackController } from './track.controller';
import { createTrackZodSchema, updateTrackZodSchema } from './track.validation';

const router = express.Router();

router.delete('/:id', auth(ENUM_USER_ROLE.USER), TrackController.deleteTrack);

router.patch(
  '/:id',
  validateRequest(updateTrackZodSchema),
  auth(ENUM_USER_ROLE.USER),
  TrackController.updateTrack
);

router.post(
  '/',
  validateRequest(createTrackZodSchema),
  auth(ENUM_USER_ROLE.USER),
  TrackController.createTrack
);

router.get('/', auth(ENUM_USER_ROLE.USER), TrackController.getAllTrack);

export default router;
