import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import Unocss from 'unocss/vite';
import { extractorSvelte } from '@unocss/core';
import transformerDirective from '@unocss/transformer-directives';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		Unocss({
			presets: [presetUno(), presetIcons()],
			transformers: [transformerDirective()],
			extractors: [extractorSvelte]
		})
	]
});
