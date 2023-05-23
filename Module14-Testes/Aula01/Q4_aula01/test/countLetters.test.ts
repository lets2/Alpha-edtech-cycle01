import { countLetters } from "../src/countLetters";

describe("Tests for invalid inputs", () => {
    test("Return a object with error when the input is not a string", () => {
        expect(countLetters(123)).toEqual({ error: "Invalid input" });
    });
});

describe("Tests for base cases", () => {
    test("Return counts in 0 when when the input is a empty string", () => {
        expect(countLetters("")).toEqual({ uppercase: 0, lowercase: 0 });
    });
});

describe("Tests for general cases", () => {
    test("Counts correctly upper and lower case letters", () => {
        expect(countLetters("AbCdEf")).toEqual({ uppercase: 3, lowercase: 3 });
    });

    test("Counts correctly when the input is only capital letters", () => {
        expect(countLetters("ABC")).toEqual({ uppercase: 3, lowercase: 0 });
    });

    test("Counts correctly when the input is only lower letters", () => {
        expect(countLetters("abc")).toEqual({ uppercase: 0, lowercase: 3 });
    });

    test("Counts correctly when the input has non-letters characters", () => {
        expect(countLetters("A1b2C3")).toEqual({ uppercase: 3, lowercase: 2 });
    });
});
