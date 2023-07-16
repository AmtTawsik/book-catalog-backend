import { IStatus } from './track.interface';

export const trackSearchableFields = ['book', 'user', 'status'];

export const tracklistFilterableFields = [
  'searchTerm',
  'book',
  'user',
  'status',
];

export const status: IStatus[] = ['notStarted', 'reading', 'soon', 'finished'];
