module.exports = {
    transform: {
        "^.+\\.(js|jsx)$": "babel-jest"
    },
    testEnvironment: 'jsdom',
    moduleFileExtensions: [ "js", "jsx"],
    roots: [
        "src"
    ],
    moduleNameMapper: {
        "src/(.*)": "<rootDir>/src/$1",
        "\\.(css)$": "<rootDir>/node_modules/jest-css-modules"
    },
    setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
}