export enum PromiseStatus {
  PENDING,
  SUCCESS,
  ERROR,
}

export type SuspenseResult<T> = {
  read: () => T;
};

export type PromiseKind<T> = Promise<T> | (() => Promise<T>);

export type SuspenseOptions = {
  keepPreviousValue: boolean;
  equalFn: (a: any[], b: any[]) => boolean;
};

export type SuspenseCacheItem<T> = {
  result: SuspenseResult<T>;
  dependencies: any[];
};

export type SuspenseCache = Map<string, SuspenseCacheItem<unknown>>;
