import { defaultKeymap, insertTab } from '@codemirror/commands';
import { css } from '@codemirror/lang-css';
import { html } from '@codemirror/lang-html';
import { javascript } from '@codemirror/lang-javascript';
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { type Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';
import type { SupportedLanguages } from './Editor.svelte';

const indentWithTab = {
	key: 'Tab',
	run: insertTab
};

export const baseExtensions = (lang: SupportedLanguages): Extension[] => {
	const extensions = [
		basicSetup,
		keymap.of([indentWithTab, ...defaultKeymap]),
		syntaxHighlighting(defaultHighlightStyle)
	];

	const langExtension = getLangExtension(lang);
	if (langExtension) {
		extensions.push(langExtension);
	}

	return extensions;
};

function getLangExtension(lang: SupportedLanguages): Extension | null {
	switch (lang) {
		case 'html':
			return html();
		case 'js':
			return javascript();
		case 'css':
			return css();
	}
	return null;
}
