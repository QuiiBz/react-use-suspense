import { PromiseKind, PromiseStatus, SuspenseResult } from '../types';

const suspensePromise = <T>(promiseKind: PromiseKind<T>, callback?: (result: T) => void): SuspenseResult<T> => {
  let status: PromiseStatus = PromiseStatus.PENDING;
  let result: T;

  const promise = typeof promiseKind === 'function' ? promiseKind() : promiseKind;

  const suspender = promise
    .then(value => {
      status = PromiseStatus.SUCCESS;
      result = value;
      callback?.(result);
    })
    .catch(error => {
      status = PromiseStatus.ERROR;
      result = error;
    });

  return {
    read: () => {
      switch (status) {
        case PromiseStatus.SUCCESS:
          return result;
        case PromiseStatus.ERROR:
          throw result;
        default:
          throw suspender;
      }
    },
  };
};

export default suspensePromise;
