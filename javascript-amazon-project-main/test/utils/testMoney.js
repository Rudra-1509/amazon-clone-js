import { formatCurrency } from "../../scripts/utils/money.js";

describe("test suite : formatCurrency", () => {
  it("Converts cents to dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("Works with 0", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  describe("Rounding", () => {
    it("Rounds up >=5", () => {
      expect(formatCurrency(2200.5)).toEqual("22.01");
    });

    it("Rounds up <5", () => {
      expect(formatCurrency(2200.4)).toEqual("22.00");
    });
  });
});
