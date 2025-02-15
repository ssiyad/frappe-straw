## `init`
This package exposes a method called `init`, which will accept parameters such
as URL, global `onError` and `onSuccess` handlers, and extra headers. This
method will create an API client and will store it in either `window` or
`global` (node) from where it can be accessed by other methods. This eliminates
the need to pass the client from one method to another manually. `init` is
mandatory for the working of this package.

## `api`
A raw, unmodified `api` method has to be exposed for customisability. This
method can be used to call frappe or any other endpoint like any other api
client. This method is the base of all other methods and resources. For example,
the `resource`, which we will cover later, is an extension of `api`. The
response of `api` will be modified, additional methods will be added and
parameters will be different. But under the hood, it will be using `api`. So if
anyone wanted to use any endpoint (or external URLs), they can use `api`.

## `auth`
Set of auth related methods. It can be used to login, logout and get current
user. This module must be able to handle authorisation in the future.

## `resource`
Resource is the fundamental data structure of this package. Any `resource` will
contain helper methods to load, reset and refresh the data. Resources can be
cached using unique identifiers. The scope of resource can be vague. A basic
use case to fetch some data that is neither a doc or a list.

## `docResource`
Document resources are `resource`s that fetch a document. A document can have
actions such as save, delete, submit and cancel in addition to load, reset and
refresh. An additional array of white listed method can be used on a document
resource. This feature however is on hold until a solution to support proper
typing is found.

## `listResource`
Much like document resources, list resources can be used to fetch an array of
documents. This type of resource will have additional methods for pagination and
temporary storage of new entries. Support for linked fields is a strong focus
point. List resources can support any arbitrary endpoint as long that endpoint
satisfied parameters provided by `listResource`.

## Cache
Having cache is a strong concern of this package. However it is not the primary
objective. While cache brings some advantages, the side effects are not trivial.
But expect this at some point in the near future.
