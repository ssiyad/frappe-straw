<div align='center'>
  <h1>Frappe Straw</h1>
  <strong>A minimal, pleasant and easy to use <a
    href='https://frappe.io/framework' target='_blank'>Frappe</a></strong>
  client.
  <div>Made with ❤️ at <a href='https://bytsolv.com/' target='_blank'>BytSolv</a>.</div>
</div>

## Warning!
This package is in very active development. Components may or may not work as
intended. If you face any issues, report them
[here](https://github.com/ssiyad/frappe-straw/issues). If you want to
contribute, please raise a [pull
request](https://github.com/ssiyad/frappe-straw/pulls).

## Example
```
import { useDocumentResource } from 'frappe-straw';
import { BaseDocument } from 'frappe-straw/types';

const { data, error, loading, refresh } = useDocumentResource<BaseDocument>(
  'Role',
  'Guest',
  {
    fetchOnMount: false,
  },
);
```

## Inspirations
- [Frappe JS SDK](https://github.com/The-Commit-Company/frappe-js-sdk)
- [frappe-ui](https://ui.frappe.io/)

## License
[GPLv3](LICENSE)
