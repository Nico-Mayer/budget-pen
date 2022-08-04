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
			shortcuts: [
				{
					'icon-btn': 'transition duration-250 hover:opacity-40',
					btn: 'text-base bg-accentLight dark:bg-accentDark text-panelBgLight dark:text-panelBgDark py-1 px-3 rounded-full transition duration-250 hover:opacity-40'
				}
			],
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
					// Light theme
					panelBgLight: '#f3f4f5',
					panelFgLight: '#00000026',
					editorBgLight: '#f8f9fa',
					uiLineLight: '#6b7d8f1f',
					accentLight: '#10b981',
					fontLight: '#5c6166',
					// Dark theme
					panelBgDark: '#1c212b',
					panelFgDark: '#707a8c',
					editorBgDark: '#1f2430',
					uiLineDark: '#171b24',
					fontDark: '#CCCAC2',
					accentDark: '#ffcc66'
				}
			}
		})
	]
});
