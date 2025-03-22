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

  const createdAt = doc.creation ? format(doc.creation) : '';
  const modifiedAt = doc.modified ? format(doc.modified) : '';

  return {
    createdAt,
    modifiedAt,
  };
};
