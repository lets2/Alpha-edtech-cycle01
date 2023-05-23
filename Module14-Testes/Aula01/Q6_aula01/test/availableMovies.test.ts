import { availableMovies, IMovie } from "../src/availableMovies";

describe("AvailableMovies function", () => {
    describe("Tests for base cases", () => {
        it("Return a empty array when input is a empty array too and age is minimum", () => {
            expect(availableMovies([{} as IMovie], 1)).toEqual([]);
        });

        it("Return a array with only element when input is a element array too and age is minimum", () => {
            expect(availableMovies([{ title: "", minAge: 0 }], 1)).toEqual([
                { title: "", minAge: 0 },
            ]);
        });
    });

    describe("Tests for movies with minAge lower than user age", () => {
        it("Return all movies from input", () => {
            expect(
                availableMovies(
                    [
                        { title: "Avatar", minAge: 12 },
                        { title: "Avengers", minAge: 10 },
                    ],
                    26
                )
            ).toEqual([
                { title: "Avatar", minAge: 12 },
                { title: "Avengers", minAge: 10 },
            ]);
        });
    });

    describe("Tests for movies with minAge higher than user age", () => {
        it("Return no movies", () => {
            expect(
                availableMovies(
                    [
                        { title: "Avatar", minAge: 12 },
                        { title: "Avengers", minAge: 10 },
                    ],
                    8
                )
            ).toEqual([]);
        });
    });

    describe("Tests for movies with minAge equal to user age", () => {
        it("Return only movies with minAge equal or lower than user age", () => {
            expect(
                availableMovies(
                    [
                        { title: "Avatar", minAge: 12 },
                        { title: "Avengers", minAge: 10 },
                        { title: "Frozen", minAge: 8 },
                    ],
                    10
                )
            ).toEqual([
                { title: "Avengers", minAge: 10 },
                { title: "Frozen", minAge: 8 },
            ]);
        });
    });
});
