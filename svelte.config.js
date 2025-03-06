import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import vercel from '@sveltejs/adapter-vercel';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	onwarn(warning, defaultHandler) {
		// ignore self-closing tags for non-void elements
		if (warning.code === 'element_invalid_self_closing_tag') return;

		// handle all other warnings normally
		defaultHandler(warning);
	},
	preprocess: vitePreprocess(),
	kit: {
		adapter: vercel({
			runtime: 'nodejs18.x',
			// Add WebSocket CSP in development
			onBefore: ({ dev }) => {
				if (dev) {
					baseCsp.push('ws://localhost:3000');
				}
			},
			// Configure static asset handling
			assets: true,
			split: false
		}),
		csrf: {
			checkOrigin: true
		},
		alias: {
			$src: 'src',
			$lib: 'src/lib',
			$routes: 'src/routes',
			$components: 'src/lib/components',
			$data: 'src/lib/data',
			$docs: 'src/lib/docs',
			$functions: 'src/lib/functions',
			$styles: 'src/lib/styles',
			$models: 'src/lib/models',
			$stores: 'src/lib/stores',
			$images: 'src/lib/images',
			$plugins: 'src/lib/plugins',
			$utils: 'src/lib/utils',
			$types: 'src/lib/types',
			$ui: 'src/lib/components/ui'
		},
		files: {
			assets: 'static',
			lib: './src/lib'
		},
		env: {
			dir: './'
		}
	},
	vitePlugin: {
		inspector: {
			holdMode: true
		}
	}
};

export default config;
