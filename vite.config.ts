import { defineConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';
import compressionPlugin from './src/lib/plugins/compressionPlugin.js';
import webSocketServer from './src/lib/plugins/webSocketServer.js';

export default defineConfig(({ mode }) => ({
	plugins: [sveltekit(), webSocketServer, compressionPlugin],
	resolve: {
		alias: {
			three: 'three',
			'three/examples/jsm/controls/OrbitControls': 'three/examples/jsm/controls/OrbitControls.js',
			'three/examples/jsm/loaders/GLTFLoader': 'three/examples/jsm/loaders/GLTFLoader.js'
		}
	},
	server: {
		host: 'localhost',
		port: 3000,
		strictPort: false,
		open: 'http://localhost:3000',
		watch: {
			usePolling: mode === 'development',
			interval: 100
		},
		hmr: {
			overlay: true,
			timeout: 0
		},
		headers: {
			'Cache-Control':
				mode === 'development' ? 'no-cache, no-store, must-revalidate' : 'public, max-age=31536000'
		}
	},
	build: {
		target: 'esnext',
		sourcemap: true,
		minify: 'terser',
		terserOptions: {
			compress: {
				drop_console: false,
				pure_funcs: ['console.info', 'console.debug', 'console.trace']
			}
		},
		rollupOptions: {
			output: {
				manualChunks: {
					svelte: ['@sveltejs/kit', 'svelte']
				}
			},
			treeshake: {
				moduleSideEffects: true,
				propertyReadSideEffects: true
			}
		},
		chunkSizeWarningLimit: 1000
	},
	optimizeDeps: {
		include: ['@sveltejs/kit', 'tailwindcss', 'three'],
		exclude: ['@vite/client', '@vite/env', '@sveltejs/adapter-node']
	},
	ssr: {
		noExternal: ['@sveltejs/kit']
	},
	preview: {
		port: 3000,
		strictPort: true
	}
}));
