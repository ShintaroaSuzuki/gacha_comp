// Returning the logarithm of the factorial result to prevent overflow
export const factorialLog = (n: number): number => {
  if (n <= 1) {
    return 0; // log(1)
  }

  return Math.log(n) + factorialLog(n - 1);
};
