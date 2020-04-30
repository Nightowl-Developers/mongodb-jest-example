module.exports = {
    globals: {
        'ts-jest': {
            tsConfig: './tsconfig.json',
        }
    },
    modulePaths: [
        '<rootDir>/src/',
    ],
    preset: 'ts-jest',
    verbose: true,
};
