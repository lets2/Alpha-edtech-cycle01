# Mod. 14 - Testing - Class 01 - Question 06

This repository contains a function for filtering a list of movies based on the minimum age required to watch them. The function is located in the file /src/availableMovies.ts.

## Tests

The file /test/availableMovies.test.ts contains four tests for the availableMovies function. The tests use the Jest testing framework and check that the function returns the expected results for different scenarios of input.

### Tests for base cases

-   The **first test** checks that the function returns an empty array when the input is an empty array and the age is the minimum required (1).
-   The **second test** checks that the function returns an array with the same element when the input is an array with only one element and the age is the minimum required (1).

### Tests for movies with minAge lower than user age

-   The **third test** checks that the function returns all the movies from the input when the minAge of all movies is lower than the user age.

### Tests for movies with minAge higher than user age

-   The **fourth test** checks that the function returns no movies when the minAge of all movies is higher than the user age.

### Tests for movies with minAge equal to user age

-   The **fifth test** checks that the function returns only the movies with minAge equal or lower than the user age.

## How to execute the tests

To run the tests, execute the following command in the root of the project directory:

```
npm rum dev
```

This command will run the tests using TypeScript development mode (tsnd) to allow continuous execution of the tests during development. It will run the tests using Jest and output the results on the terminal.

## Conclusion

According to the requirements, if the minimum age to see the movie is equal to the user's age, the user can watch this movie, that is, the movie in question must be part of the filtered array. The **last test (fifth)** fails because { title: "Avengers", minAge: 10 } was one of the expected responses in the array, but was not received from the function. Given the above, it is concluded that the function does not work as it should and needs to be modified (the condition must be "return movie.minAge **<=** age;").

## Author

[Letonio](https://github.com/lets2)
