# Next Parallel Routes

(WIP)

Parallel routes can be used to render one or more pages within the same layout, either dynamically or in parallel. Useful for i.e. Dashboards.

They are defined using slots with the `@folder` convention:

```
app
|- @products
   |- page.tsx
|- @cart
   |- page.tsx
layout.tsx
page.tsx
```

The root `layout.tsx` now accepts the `@products` and `@cart` slots automagically:

```tsx
export default function Layout({
  children,
  products,
  cart,
}: {
  children: React.ReactNode;
  products: React.ReactNode;
  cart: React.ReactNode;
}) {
  return (
    <>
      {children}
      {products}
      {cart}
    </>
  );
}
```

Slots are not route segments and will not affect the URL structure.

## Examples

### Conditional Routes

Given the structure

```
app
|- @products
   |- page.tsx
|- @cart
   |- page.tsx
layout.tsx
page.tsx
```

in the layout, we can render one of the two parallel routes conditionally:

```tsx
export default function Layout({
  products,
  cart,
}: {
  products: React.ReactNode;
  cart: React.ReactNode;
}) {
  const condition = evaluateCondition();

  return <>{condition ? cart : products}</>;
}
```
