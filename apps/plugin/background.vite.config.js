import { defineConfig } from 'vite';

export default defineConfig({
    publicDir: false,
    build: {
        rollupOptions: {
            input: {
                background: './src/background/index.js',
                // subpage: 'src/subpage.js',
            },
            output: {
                dir: "dist/background",
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name === 'background') {
                        return 'background.js';
                    }
                    return '[name].[hash].js';
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.includes('background')) {
                        return assetInfo.name;
                    }
                    return 'background.[ext]';
                },
            },
        },
    },
});
