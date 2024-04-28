# A philosophy of Software Design - Chapter 7

Software systems are desinged in layers, where every layer provides a different abstraction compared to the layers above and below.  
If a system contains adjacent layers with similar abstractions, this is a red flag.

The chapter discusses situations where this happens, what problems arise from it and how to refactor code accordingly.


## Pass-through methods

A pass-through method is a method that does little more than calling a similar method, often with the same signature:

```ts
function storeItem(item: string, key: string) {
  window.localStorage.setItem(item, key)
}
```
Pass-through methods make classes shallower: They increase the interfact of the class without increasing the functionality.

They also create dependencies between classes: If `window.localStorage.setItem()` would change to accept an object now:

```ts
type Payload = {
  value: string
  key: string
}

// in window.localStorage
function setItem(payload: Payload) {
  //...
}
```

the `storeItem` function would have to change as well (two changed needed compared to one).

Pass-through methods indicate confusion over the responsibilities of classes.

## When is interface duplication okay?

Interfact duplication is okay when the duplicate method acts as a _dispatcher_: A dispatcher uses it's arguments to select on of several other methods to invoke. They often have the same interface as the methods they're duplicating.

```ts
function storeItem(item: string, key: string) {
  if (typeof item === 'string') {
    window.localStorage.setItem(item, 'MY_APP_USER_EMAIL")
    return
  }

  if (Array.isArray(item)) {
    const serializedItem = JSON.stringify(item)
    window.localStorage.setItem(serializedItem, 'MY_APP_CART_PRODUCTS")
  }
}
```

## Decorators

A _decorator_ (or _wrapper_) takes an exising object and extends it's functionality, providing a smiliar or identical API to the underlying object

```ts
function storeItem(item: string, key: string) {
  const prefixedKey = `MY_APP_${key}`
  window.localStorage.setItem(item, prefixedKey)
}
```

Sometimes they make sense to use, but usually there is a better solution:

- Can the functionality be added directly into the underlying class, if it is general purpose enough?
- Would it make sense to merge the functionality with the use case, instead of generating a new class?
- Can the new functionality be merged with an existing decorator?
- Can the functionality be wrapped in a stand-alone way?

## Interface versus implementation

The interface of a class should normally be different from its implementation, meaning the representations internally should be different from the interface a class exposes.

With this `cart` file

```ts
// cart.ts
const CART_STORAGE KEY = "MY_APP_CART"

export type CartItem {
  id: string, 
  name: string, 
  qty: number 
}

export type Cart {
  createdAt: string
  items: CartItem[]
}

export function getCart(): string | null {
  return window.localStorage.getItem(CART_STORAGE_KEY)
}


export function findItem(cart: Cart, productId: string): CartItem | undefined {
  return cart.items.find((item) => item.id === productId)
}
```

a caller would have to do the following to fetch a product from the cart:

```ts
// caller.ts
import { getCart, findItem, Cart } from 'cart'

const storedCart = getCart()

if (!storedCart) {
  return
}

const cart: Cart = JSON.parse(storedCart)

const product = findItem(cart, "1")
```

We could simplify the interface and make the `cart` class deeper:

```ts
// cart.ts
const CART_STORAGE KEY = "MY_APP_CART"

export type CartItem {
  id: string, 
  name: string, 
  qty: number 
}

type Cart {
  createdAt: string
  items: CartItem[]
}


export function findItem(productId: string): CartItem | undefined {
  const storedCart = window.localStorage.getItem(CART_STORAGE_KEY)

  if (!storedCart) {
    return undefined
  }

  const cart: Cart = JSON.parse(storedCart)

  return cart.items.find((item) => item.id === productId)
}
```

which would allow the caller to not need any knowledge of the `Cart` at all:

```ts
// caller.ts
import { findItem } from 'cart'

const product = findItem("1")
```

## Pass-through variables

Similar to pass-through methods, pass-through variables are passed through many different layers. They may be defined in the topmost layer but only be needed in the lowest layer. They add complexity because they force every intermediate function to be aware of their existence.

There are multiple ways to work around this, none of them optimal:

- shared objects
- global variables
- context

From the above, the context is the lest suboptimal solution. It requires dispcipline to make sure the context does not become a grab-bag of variables.

## Conculsion

General rule: "Different layer, different abstraction"
