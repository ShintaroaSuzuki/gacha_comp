import { probability } from "./probability";

export const thresholds = async (
  k: number,
  interval: number
): Promise<number[]> => {
  let n = k;
  const result: number[] = [];

  const probabilities: number[] = [];
  // prevent floating point errors
  for (
    let i = interval;
    Math.round(i * 100) <= (1 - interval) * 100;
    i += interval
  ) {
    probabilities.push(i);
  }

  while (probabilities.length > 0) {
    const p = probability(n, k, k);
    if (p > probabilities[0]) {
      result.push(n);
      probabilities.shift();
    } else {
      n++;
    }
  }

  return result;
};
