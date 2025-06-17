import { defaultKeymap, insertTab } from '@codemirror/commands';
import { defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { type Extension } from '@codemirror/state';
import { keymap } from '@codemirror/view';
import { basicSetup } from 'codemirror';

const indentWithTab = {
	key: 'Tab',
	run: insertTab
};

export const baseExtensions: Extension[] = [
	basicSetup,
	keymap.of([indentWithTab, ...defaultKeymap]),
	syntaxHighlighting(defaultHighlightStyle)
];
