import { factorialLog } from "./factorialLog";

describe("factorial", () => {
  test("0!", () => {
    expect(Math.exp(factorialLog(0))).toBe(1);
  });

  test("1!", () => {
    expect(Math.exp(factorialLog(1))).toBe(1);
  });

  test("10!", () => {
    expect(Math.round(Math.exp(factorialLog(10)))).toBe(3628800);
  });
});
