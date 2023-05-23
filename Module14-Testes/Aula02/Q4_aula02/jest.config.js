/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: "ts-jest",
    testEnvironment: "node",
    collectCoverage: true,
    coverageReporters: ["clover", "json", "lcov", ["text", { skipFull: true }]],
};
