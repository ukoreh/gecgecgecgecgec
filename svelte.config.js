import { vitePreprocess } from '@sveltejs/kit/vite';

import adapter from '@sveltejs/adapter-static';

import path from 'path';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://kit.svelte.dev/docs/integrations#preprocessors
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		adapter: adapter({
			// default options are shown. On some platforms
			// these options are set automatically — see below
			pages: 'build',
			assets: 'build',
			fallback: null,
			precompress: false,
			strict: true
		}),

		alias: {
			'@components': path.resolve('./src/lib/components/index.ts'),
			'@http': path.resolve('./src/lib/http/index.ts'),
			'@models': path.resolve('./src/lib/models/index.ts'),
			'@stores': path.resolve('./src/lib/stores/index.ts'),
			'@i18n': path.resolve('./src/i18n/index.ts'),
			'@media-query': path.resolve('./src/lib/media-query/index.ts')
		}
	}
};

export default config;
