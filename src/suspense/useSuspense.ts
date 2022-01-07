import { useState } from 'react';
import { PromiseKind, SuspenseCache, SuspenseCacheItem, SuspenseOptions } from '../types';
import { suspenseOptions } from './options';
import suspensePromise from './utils';

const cache: SuspenseCache = new Map();

const useSuspense = <T>(
  key: string,
  promise: PromiseKind<T>,
  dependencies: any[] = [],
  options: Partial<SuspenseOptions> = suspenseOptions,
): T => {
  const [, update] = useState<number>();
  const cacheResult = cache.get(key) as SuspenseCacheItem<T> | undefined;

  const finalOptions: SuspenseOptions = {
    ...suspenseOptions,
    ...options,
  };

  if (cacheResult && finalOptions.equalFn(cacheResult.dependencies, dependencies)) {
    return cacheResult.result.read();
  }

  if (cacheResult && finalOptions.keepPreviousValue) {
    const result = suspensePromise(promise, () => {
      update(Math.random());
    });

    cache.set(key, {
      result,
      dependencies,
    });

    return cacheResult.result.read();
  }

  const result = suspensePromise(promise);

  cache.set(key, {
    result,
    dependencies,
  });

  return result.read();
};

export default useSuspense;
