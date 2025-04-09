import { BaseDocument } from '../types';

export const useStatus = <T extends BaseDocument>(doc?: T) => {
  switch (doc?.docstatus) {
    case 0:
      return 'Draft';
    case 1:
      return 'Submitted';
    case 2:
      return 'Cancelled';
    default:
      return 'Unknown';
  }
};
