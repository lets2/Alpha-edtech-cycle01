# Mod. 14 - Testing - Class 02 - Question 05

This repository contains a function for summing two numbers in TypeScript. The function is located in the file /src/sum.ts.

## Tests

The file /test/sum.test.ts contains three tests for the sum function. The tests use the Jest testing framework and check that the function returns the expected results for different combinations of input.

-   The first test checks that the function returns the correct result for the sum of 20 and 10.
-   The second test checks that the function returns the correct result for the sum of -10 and 10.
-   The third test checks that the function returns the correct result for the sum of 2 and 2.

## How to execute the tests

To run the tests, execute the following command in the root of the project directory:

```
npm rum dev
```

This command will run the tests using TypeScript development mode (tsnd) to allow continuous execution of the tests during development.

## Coverage

Jest's configuration specifies which code coverage reports should be generated after running tests. When running the tests, the reports are available in /coverage. To simulate incomplete coverage (less than 100%), /src/sum.ts has a function that is never called in tests.

## Author

[Letonio](https://github.com/lets2)
