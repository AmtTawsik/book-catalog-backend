import { GenericErrorMessageType } from './error';

/**
 * Represents a generic error response type.
 */
export type GenericErrorResponseType = {
  statusCode: number; // status for error
  message: string;
  errorMessages: GenericErrorMessageType[];
};

export type PaginationOptionType = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ascending' | 'asc' | 'descending' | 'desc';
};

export type GenericResponseType<T> = {
  meta: {
    page: number;
    limit: number;
    total: number;
  };
  data: T;
};
