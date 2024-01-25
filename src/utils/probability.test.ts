import { probability } from "./probability";

describe("probability", () => {
  test("probability(1, 1)", () => {
    expect(probability(1, 1, 1)).toBe(1);
  });

  test("probability(2, 1)", () => {
    expect(probability(2, 1, 1)).toBe(1);
  });

  test("probability(6, 4)", () => {
    expect(probability(6, 4, 4)).toBe(195 / 512);
  });
});
