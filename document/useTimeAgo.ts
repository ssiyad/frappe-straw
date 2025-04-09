import { formatDistanceToNow, parseISO } from 'date-fns';
import { BaseDocument } from '../types';

export const useTimeAgo = <T extends BaseDocument>(doc?: T) => {
  if (!doc) {
    return {
      createdAt: '',
      modifiedAt: '',
    };
  }

  const format = (dateStr: string) => {
    return formatDistanceToNow(parseISO(dateStr), {
      addSuffix: true,
    });
  };

  return {
    createdAt: format(doc.creation),
    modifiedAt: format(doc.modified),
  };
};
