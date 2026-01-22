import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
    test: {
        globals: true,
        environment: 'node',
        exclude: ['**/node_modules/**', '**/dist/**', '**/out/**'],
    },
    resolve: {
        alias: {
            '@core': path.resolve(__dirname, './src/core'),
            '@infrastructure': path.resolve(__dirname, './src/infrastructure'),
            '@usecase': path.resolve(__dirname, './src/usecase'),
        },
    },
});
