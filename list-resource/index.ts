import { Resource } from '../resource';

export class ListResource extends Resource {
  get currentPage() {
    // If `limit_start` and `limit` are not provided, default to page 1
    if (!this.params || !this.params.limit_start || !this.params.limit) {
      return 1;
    }

    // Calculate page number
    return Math.floor(this.params.limit_start / this.params.limit) + 1;
  }

  /**
   * Fetch next page of data.
   */
  nextPage() {
    if (this.params && this.params.limit && this.params.limit_start) {
      const pageNumber = this.currentPage + 1;
      const start = (pageNumber - 1) * this.params.limit;
      this.params.limit_start = start;
      this.refresh();
    }
  }

  /**
   * Fetch previous page of data.
   */
  previousPage() {
    if (this.params && this.params.limit && this.params.limit_start) {
      const pageNumber = this.currentPage - 1;
      const start = (pageNumber - 1) * this.params.limit;
      this.params.limit_start = start;
      this.refresh();
    }
  }
}

/**
 * Create a `ListResource`.
 * @param doctype - Document type.
 * @returns `ListResource`
 */
export function createListResource({
  doctype,
  fields,
  group,
  sort,
  start,
  limit,
}: {
  doctype: string;
  fields?: string[];
  group?: string;
  sort?: {
    field: string;
    direction: string;
  };
  start?: number;
  limit?: number;
}) {
  const url = '/api/resource/' + doctype;
  const params = {
    fields: fields,
    group_by: group,
    order_by: sort && sort.field + ' ' + sort.direction,
    limit: limit,
    limit_start: start,
    as_dict: true,
  };
  const placeholder = [];

  return new ListResource(
    url,
    undefined,
    undefined,
    params,
    undefined,
    placeholder,
  );
}

createListResource({
  doctype: 'User',
});
