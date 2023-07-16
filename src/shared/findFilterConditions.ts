export const findFilterConditions = (
  searchTerm: string | undefined,
  filtersData: object,
  searchableFields: string[]
) => {
  const andConditions = [];
  if (searchTerm) {
    andConditions.push({
      $or: searchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  // if (Object.keys(filtersData).length) {
  //   andConditions.push({
  //     $and: Object.entries(filtersData).map(([field, value]) => ({
  //       [field]: value,
  //     })),
  //   });
  // }

  if (Object.keys(filtersData).length) {
    const filterConditions = Object.entries(filtersData).map(
      ([field, value]) => {
        if (field === 'publicationYear') {
          const year = value.substring(0, 4);
          return {
            [field]: {
              $regex: `^${year}`,
              $options: 'i',
            },
          };
        } else {
          return {
            [field]: value,
          };
        }
      }
    );

    andConditions.push({
      $and: filterConditions,
    });
  }

  return andConditions;
};
