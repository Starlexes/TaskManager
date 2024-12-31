import type { AdaptedFilterParams } from '@/types/AdaptedFilterParams.interface';
import { FilterOptions } from '@/types/FilterOptions.enum';

const adaptFilterParams = (queryParams: string | string[]): AdaptedFilterParams => {
  const adaptedParams: AdaptedFilterParams = {};

  if (queryParams) {
    const filters = Array.isArray(queryParams) ? queryParams : [queryParams];

    filters.forEach((filter) => {
      switch (filter) {
        case FilterOptions.COMPLETED:
          adaptedParams.completed = true;
          break;
        case FilterOptions.UNCOMPLETED:
          adaptedParams.completed = false;
          break;
        case FilterOptions.TODAY:
          adaptedParams.today = true;
          break;
      }
    });
  }
  return adaptedParams;
};

export default adaptFilterParams;
