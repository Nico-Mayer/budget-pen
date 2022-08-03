import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import Unocss from 'unocss/vite';
import { extractorSvelte } from '@unocss/core';
import transformerDirective from '@unocss/transformer-directives';
import presetIcons from '@unocss/preset-icons';
import presetUno from '@unocss/preset-uno';
import presetWebFonts from '@unocss/preset-web-fonts';
import transformerVariantGroup from '@unocss/transformer-variant-group';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		svelte(),
		Unocss({
			presets: [
				presetUno(),
				presetIcons(),
				presetWebFonts({
					provider: 'google',
					fonts: {
						mono: ['IBM Plex Mono'],
						heading: ['Chivo']
					}
				})
			],
			transformers: [transformerDirective(), transformerVariantGroup()],
			extractors: [extractorSvelte]
		})
	]
});
