<div align='center'>
  <h1>Frappe Straw</h1>
  <strong>A minimal, pleasant and easy to use <a
    href='https://frappe.io/framework' target='_blank'>Frappe</a></strong>
  client.
  <div>Powered By</div>
  <a href='https://bytsolv.com/' target='_blank'>
    <picture>
      <source media="(prefers-color-scheme: dark)"
        srcset="https://raw.githubusercontent.com/ssiyad/frappe-straw/refs/heads/main/assets/bytsolv-dark.svg">
      <source media="(prefers-color-scheme: light)"
        srcset="https://raw.githubusercontent.com/ssiyad/frappe-straw/refs/heads/main/assets/bytsolv-light.svg">
      <img alt="BytSolv Logo"
        src="https://raw.githubusercontent.com/ssiyad/frappe-straw/refs/heads/main/assets/bytsolv-light.svg">
    </picture>
  </a>
</div>

## Warning!
This package is in very active development. Components may or may not work as
intended. If you face any issues, report them
[here](https://github.com/ssiyad/frappe-straw/issues). If you want to
contribute, please raise a [pull
request](https://github.com/ssiyad/frappe-straw/pulls).

## Examples
#### A basic user type
```
type User = {
  ...BaseDocument;
  name: string;
  age: number;
  org: string;
}
```

#### Document Resource
```
const user = createDocumentResource<User>({
  doctype: 'User',
  docname: 'hello@example.com',
})
```

#### List Resource
```
const users = createListResource<User>({
  doctype: 'User',
  fields: ['name', 'age', 'org'],
  filters: {
    org: 'Example Org.',
    age: {
      operator: '>',
      value: 25,
    }
  }
})
```

## Architecture
[Documentation](architecture.md)

## Inspirations
- [Frappe JS SDK](https://github.com/The-Commit-Company/frappe-js-sdk)
- [frappe-ui](https://ui.frappe.io/)

## License
[GPLv3](LICENSE)
