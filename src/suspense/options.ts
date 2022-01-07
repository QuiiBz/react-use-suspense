import { SuspenseOptions } from '../types';

export const suspenseOptions: SuspenseOptions = {
  keepPreviousValue: true,
  equalFn: (a, b) => JSON.stringify(a) === JSON.stringify(b),
};

export const setKeepPreviousValue = (keepPreviousValue: boolean) => {
  suspenseOptions.keepPreviousValue = keepPreviousValue;
};

export const setEqualFn = (equalFn: (a: any[], b: any[]) => boolean) => {
  suspenseOptions.equalFn = equalFn;
};
