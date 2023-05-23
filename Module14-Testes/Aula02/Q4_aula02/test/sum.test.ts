import { sum, sum3numbers } from "../src/sum";

describe("Tests for the sum function", () => {
    it("should return the correct result when adding two numbers positives", () => {
        expect(sum(20, 10)).toBe(30);
    });

    it("should return the correct result when adding one positive with a negative number", () => {
        expect(sum(-10, 10)).toBe(0);
    });

    it("should return the correct result when adding two equal positive numbers", () => {
        expect(sum(2, 2)).toBe(4);
    });
});
