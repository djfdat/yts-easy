import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';
import { strict } from 'assert';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	// Consult https://svelte.dev/docs/kit/integrations
	// for more information about preprocessors
	preprocess: vitePreprocess(),

	kit: {
		// adapter-auto only supports some environments, see https://svelte.dev/docs/kit/adapter-auto for a list.
		// If your environment is not supported, or you settled on a specific environment, switch out the adapter.
		// See https://svelte.dev/docs/kit/adapters for more information about adapters.
		adapter: adapter(
			{
				// default options are shown. On some platforms, you may need to set `fallback` to `index.html`
				// or `index.htm` if your platform does not support single-page applications.
				fallback: null,
				pages: 'build',
				assets: 'build',
				precompress: false,
				strict: false
			}
		)
	}
};

export default config;
