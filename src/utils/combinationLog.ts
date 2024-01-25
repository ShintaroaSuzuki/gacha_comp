import { factorialLog } from "./factorialLog";

// Returning the logarithm of the factorial result to prevent overflow
export const combinationLog = (n: number, r: number): number => {
  return factorialLog(n) - (factorialLog(r) + factorialLog(n - r));
};
