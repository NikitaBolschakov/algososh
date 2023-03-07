export const MAXVALUE: number = 19;
export const MAXLEN: number = 2;

//получить число в массив фибоначчи
export const getNumber = (n: number) => {
  if (n < 2) return n;
  let a = 1;
  let b = 1;
  for (let i = 3; i <= n; i++) {
    [a, b] = [b, a + b];
  }
  return b;
};
