import { combinationLog } from "./combinationLog";

// the probability of obtaining m different types in n trials with replacement from k types of elements
export const probability = (
  n: number,
  k: number,
  m: number,
  memo: number[] = []
): number => {
  if (m > k) {
    throw new Error("m must be less than or equal to k");
  }
  if (n === 0 || k === 0 || m === 0) {
    throw new Error("n, k, and m must be positive integers");
  }

  if (m === 1) {
    return Math.exp(-(n - 1) * Math.log(k)); // 1 / k ** (n - 1)
  }

  let result = Math.exp(
    n * Math.log(m) + combinationLog(k, m) - n * Math.log(k)
  ); // m ** n * combination(k, m) / k ** n

  for (let i = 1; i < m; i++) {
    let p = memo[i] ?? probability(n, k, i, memo);
    if (memo[i] === undefined) memo[i] = p;
    let c = Math.exp(
      combinationLog(k, m) + combinationLog(m, i) - combinationLog(k, i)
    ); // combination(k, m) * combination(m, i) / combination(k, i)
    result -= c * p;
  }

  return result;
};
