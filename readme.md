## Frappe Straw
A minimal, pleasant and easy to use [Frappe](https://frappe.io/framework)
client.

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
