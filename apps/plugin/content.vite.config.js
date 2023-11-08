import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

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
    plugins: [react()],
    publicDir: false,
    build: {
        rollupOptions: {
            input: {
                content: './src/content/index.jsx',
                // subpage: 'src/subpage.js',
            },
            output: {
                dir: 'dist/content',
                entryFileNames: (chunkInfo) => {
                    if (chunkInfo.name === 'content') {
                        return 'content.js';
                    }
                    return '[name].[hash].js';
                },
                assetFileNames: (assetInfo) => {
                    if (assetInfo.name.includes('content')) {
                        return assetInfo.name;
                    }
                    return 'content.[ext]';
                },
            },
        },
    },
});
