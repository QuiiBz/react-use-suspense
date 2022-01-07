import React, { Suspense, useState } from 'react';
import { render, fireEvent } from '@testing-library/react';
import useSuspense from '../src';

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

describe('useSuspense', () => {
  it('should suspense', async () => {
    const Component = () => {
      const data = useSuspense('data', async () => {
        await wait(100);
        return 'Hello world';
      });

      return <p>{data}</p>;
    };

    const { findByText } = render(
      <Suspense fallback="Loading">
        <Component />
      </Suspense>,
    );

    await findByText('Loading');
    await findByText('Hello world');
  });

  it("should suspense and don't update without dependencies", async () => {
    const Component = () => {
      const [count, setCount] = useState(0);
      const data = useSuspense('noDeps', async () => {
        await wait(100);
        return `Count: ${count}`;
      });

      return (
        <>
          <button type="button" onClick={() => setCount(count + 1)}>
            Increment
          </button>
          <p>{data}</p>
        </>
      );
    };

    const { getByText, findByText, queryByText } = render(
      <Suspense fallback="Loading">
        <Component />
      </Suspense>,
    );

    await findByText('Loading');
    await findByText('Count: 0');
    fireEvent.click(getByText('Increment'));
    expect(queryByText('Loading')).toBeNull();
    await findByText('Count: 0');
  });

  it('should suspense with dependencies', async () => {
    const Component = () => {
      const [count, setCount] = useState(0);
      const data = useSuspense(
        'deps',
        async () => {
          await wait(100);
          return `Count: ${count}`;
        },
        [count],
      );

      return (
        <>
          <button type="button" onClick={() => setCount(count + 1)}>
            Increment
          </button>
          <p>{data}</p>
        </>
      );
    };

    const { getByText, findByText, queryByText } = render(
      <Suspense fallback="Loading">
        <Component />
      </Suspense>,
    );

    await findByText('Loading');
    await findByText('Count: 0');
    fireEvent.click(getByText('Increment'));
    expect(queryByText('Loading')).toBeNull();
    await findByText('Count: 1');
  });

  it('should suspense with dependencies and keepPreviousValue false', async () => {
    const Component = () => {
      const [count, setCount] = useState(0);
      const data = useSuspense(
        'depsKeepPrevious',
        async () => {
          await wait(100);
          return `Count: ${count}`;
        },
        [count],
        {
          keepPreviousValue: false,
        },
      );

      return (
        <>
          <button type="button" onClick={() => setCount(count + 1)}>
            Increment
          </button>
          <p>{data}</p>
        </>
      );
    };

    const { getByText, findByText } = render(
      <Suspense fallback="Loading">
        <Component />
      </Suspense>,
    );

    await findByText('Loading');
    await findByText('Count: 0');
    fireEvent.click(getByText('Increment'));
    await findByText('Loading');
    await findByText('Count: 1');
  });
});
