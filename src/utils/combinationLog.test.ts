import { combinationLog } from "./combinationLog";

describe("combination", () => {
  test("0C0", () => {
    expect(Math.exp(combinationLog(0, 0))).toBe(1);
  });

  test("1C0", () => {
    expect(Math.exp(combinationLog(1, 0))).toBe(1);
  });

  test("1C1", () => {
    expect(Math.exp(combinationLog(1, 1))).toBe(1);
  });

  test("4C2", () => {
    expect(Math.round(Math.exp(combinationLog(4, 2)))).toBe(6);
  });

  test("10C3", () => {
    expect(Math.round(Math.exp(combinationLog(10, 3)))).toBe(120);
  });
});
