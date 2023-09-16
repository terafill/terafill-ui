import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { nodePolyfills } from 'vite-plugin-node-polyfills';

// https://vitejs.dev/config/
export default defineConfig({
    server: {
        host: '0.0.0.0',
        port: 3000,
        strictPort: true,
    },
    preview: {
        host: '0.0.0.0',
        port: 3000,
        strictPort: true,
    },

    plugins: [
        react(),
        nodePolyfills({
            // To add only specific polyfills, add them here. If no option is passed, adds all polyfills
            include: ['crypto', 'stream', 'util'],
            // To exclude specific polyfills, add them to this list. Note: if include is provided, this has no effect
            exclude: [],
            // Whether to polyfill specific globals.
            globals: {
                Buffer: true, // can also be 'build', 'dev', or false
                global: true,
                process: true,
            },
            // Override the default polyfills for specific modules.
            overrides: {
                // Since `fs` is not supported in browsers, we can use the `memfs` package to polyfill it.
            },
            // Whether to polyfill `node:` protocol imports.
            protocolImports: true,
        }),
    ],
    resolve: {
        alias: {
            pages: '/pages',
            components: '/components',
            config: '/config',
            src: '/src',
            lib: '/lib'
        },
    },
});
