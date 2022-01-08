<p align="center">
    <h1 align="center">react-use-suspense</h1>
</p>

<p align="center">
    <a href="https://github.com/QuiiBz/react-use-suspense/actions">
        <img src="https://github.com/QuiiBz/react-use-suspense/workflows/CI/badge.svg" />
    </a>
    <a href="https://github.com/QuiiBz/react-use-suspense/blob/main/LICENSE">
        <img src="https://img.shields.io/badge/Licence-MIT-blue" />
    </a>
</p>

<p align="center">
  Lightweight useSuspense hook for React
  <br />
  <br />
  <code>yarn add react-use-suspense</code>
</p>

---

- [✨ Features](#-features)
- [🚀 Example](#-example)
- [📚 Documentation](#-documentation)
- [License](#license)

**react-use-suspense** provides a very simple and lightweight `useSuspense` hook to use the [Suspense](https://reactjs.org/docs/react-api.html#reactsuspense) API with any async function.

## ✨ Features

- **Suspense** for new versions of React
- **Dependency array** <sub>(like useEffect)</sub>
- **TypeScript** ready
- **Minimal** footprint <sub>(1kB gzipped)</sub>

## 🚀 Example

```tsx
function Component() {
  const data = useSuspense('data', async () => {
    // ...
    return 'Hello world'
  })

  return <p>{data}</p>
}

function App() {
  return (
    <Suspense fallback="Loading...">
      <Component />
    </Suspense>,
  )
}
```

## 📚 Documentation

### Basics

Import the `useSuspense` hook from `react-use-suspense`. This hook accepts a key that must be unique to the data you want to fetch, and an async function that returns this data:

```tsx
import { useSuspense } from 'react-use-suspense'

function Component() {
  const data = useSuspense('unique-key', async () => {
    // ...
    return 'Hello world'
  })
}
```

When you need to use this component, simply wrap it inside a `Suspense` component and provide a `fallback` prop:

```tsx
function App() {
  return (
    <Suspense fallback="Loading...">
      <Component />
    </Suspense>,
  )
}
```

### Dependency array

Similar as the `useEffect`, `useMemo`, `useCallback`... hooks, you can pass a third argument as known as a **dependency array**. Whenever one of the dependency in this array changes, the async function will re-run:

```tsx
function Component({ name }) {
  const data = useSuspense('unique-key', async () => {
    // ...
    return 'Hello: ' + name
  }, [name]) // Will trigger when name changes
}
```

### Options

As the fourth argument, you can pass an optionnal object of options:

#### `keepPreviousValue`

This option will make sure to not trigger a `Suspense` when the async function re-runs. This is the default behavior, and you can disable to always trigger a `Suspense`:

```tsx
const data = useSuspense('unique-key', async () => {
  // ...
  return 'Hello: ' + name
}, [name], {
  keepPreviousValue: false
})
```

#### `equalFn`

You can provide a custom equality function that is used to compare old and new dependency arrays.

```tsx
const data = useSuspense('unique-key', async () => {
  // ...
  return 'Hello world'
}, [], {
  // This is the default one
  equalFn: (a, b) => JSON.stringify(a) === JSON.stringify(b)
})
```

Alternatively, you can update these options globally if you always want to have those behaviors:

```tsx
import { setKeepPreviousValue, setEqualFn } from 'react-use-suspense'

setKeepPreviousValue(false)
setEqualFn((a, b) => JSON.stringify(a) === JSON.stringify(b))
```

## License

[MIT](./LICENSE)
