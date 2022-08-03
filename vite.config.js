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
			shortcuts: [{ 'icon-btn': '' }],
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
			extractors: [extractorSvelte],
			theme: {
				colors: {
					panelBgLight: '#f3f4f5',
					panelBgDark: '#1c212b',
					panelFgLight: '#8a9199',
					panelFgDark: '#707a8c',
					editorBgLight: '#f8f9fa',
					editorBgDark: '#1f2430',
					uiLineLight: '#6b7d8f1f',
					uiLineDark: '#171b24',
					fontLight: '#5c6166',
					fontDark: '#CCCAC2',
					accentLight: '#ffaa33',
					accentDark: '#ffcc66'
				}
			}
		})
	]
});
