<div align='center'>
  <h1>Frappe Straw</h1>
  <img src='https://raw.githubusercontent.com/ssiyad/frappe-straw/refs/heads/main/assets/bytsolv-logo.svg' width='150' />
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
  <div>Made with ❤️ at <a href='https://bytsolv.com/' target='_blank'>Bytsolv</a>.</div>
</div>

## Demo
You can install the demo app from
[here](https://github.com/ssiyad/frappe-straw-demo). It contain example code
and a playground. This can also be used as a test suite for development of this
plugin.

## Installation
```shell
npm install frappe-straw
```

Example
```typescript
import { useDocument } from 'frappe-straw';
import { type BaseDocument } from 'frappe-straw/types';

const { data, error, loading, refresh } = useDocument<BaseDocument>(
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

## Self Promotion
Like this project? Give it a star! ⭐, and spread the word! 🚀. And if you are
feeling especially charitable, follow [Sabu Siyad](https://ssiyad.com) on
[GitHub](https://github.com/ssiyad)
