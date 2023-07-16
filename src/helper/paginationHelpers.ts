import { SortOrder } from 'mongoose';

// Defines the type for pagination options
type PaginationOptionType = {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

// Defines the type for the returned pagination options
type PaginationOptionReturnType = {
  page: number;
  limit: number;
  skip: number;
  sortBy?: string;
  sortOrder?: SortOrder;
};

/**
 * calculationPagination is a helper function that calculates the pagination options based on the provided options.
 * It takes the page, limit, sortBy, and sortOrder from the options object and performs necessary calculations to determine the skip value.
 * The calculated pagination options are then returned as an object.
 * @param options The pagination options.
 * @returns The calculated pagination options.
 */
const calculationPagination = (
  options: PaginationOptionType
): PaginationOptionReturnType => {
  // Extracts the page, limit, sortBy, and sortOrder from the options object
  const page = Number(options.page) || 1;
  const limit = Number(options.limit) || 10;
  const sortBy = options.sortBy || 'createdAt';
  const sortOrder = options.sortOrder || 'desc';

  // Calculates the skip value based on the page and limit
  const skip = (page - 1) * limit;

  // Returns the calculated pagination options
  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

// Exports the calculationPagination function as part of the PaginationHelpers object
export const PaginationHelpers = {
  calculationPagination,
};
