// eslint-disable-next-line n/no-deprecated-api
const isTsRegistered = require.extensions['.ts'];

if (!isTsRegistered) {
    require('ts-node').register({
        project: './tsconfig.json',
        compilerOptions: {
            module: 'commonjs',
        },
    });
}

module.exports = require('./vue.config.ts').default;