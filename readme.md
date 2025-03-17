<div align='center'>
  <h1>Frappe Straw</h1>
  <div>
    <img src='https://img.shields.io/github/actions/workflow/status/ssiyad/frappe-straw/tests.yml' />
    <img src='https://img.shields.io/npm/dw/frappe-straw' />
    <img src='https://img.shields.io/npm/v/frappe-straw' />
  </div>
  <strong>
    Minimal, pleasant and easy to use
    <a href='https://frappe.io/framework' target='_blank'>Frappe</a>
    client.
  </strong>
  <div>Made with ❤️ at <a href='https://bytsolv.com/' target='_blank'>BytSolv</a>.</div>
</div>

## Warning!
This package is in very active development. Components may or may not work as
intended. If you face any issues, report them
[here](https://github.com/ssiyad/frappe-straw/issues). If you want to
contribute, please raise a [pull
request](https://github.com/ssiyad/frappe-straw/pulls).

## Example
```typescript
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
