import { thresholds } from "./thresholds";

describe("thresholds", () => {
  test("thresholds(5, 0.1)", () => {
    expect(thresholds(5, 0.1)).resolves.toEqual([
      6, 7, 8, 9, 10, 11, 13, 15, 18,
    ]);
  });
});
