import * as esbuild from 'esbuild';
import { nodeModulesPolyfillPlugin } from 'esbuild-plugins-node-modules-polyfill';

await esbuild.build({
    entryPoints: ['src/index.jsx'],
    bundle: true,
    outdir: 'build',
    sourcemap: true,
    minify: true,
    sourcesContent: false,
    platform: 'browser',
    alias: {
        'node:process': 'process/browser',
        'node:buffer': 'buffer/',
    },
    plugins: [
        nodeModulesPolyfillPlugin({
            globals: {
                process: true,
                Buffer: true,
            },
            modules: ['crypto', 'stream', 'assert'],
        }),
    ],
});
