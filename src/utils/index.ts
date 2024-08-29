export const delay = (time: number) => {
  return new Promise((resolve) => {
    setTimeout(resolve, time);
  });
};

export * from './bcrypt';
export * from './string';
export * from './date';
export * from './interfaces';
