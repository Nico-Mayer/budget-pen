import { HighlightStyle, defaultHighlightStyle, syntaxHighlighting } from '@codemirror/language';
import { EditorView } from '@codemirror/view';
import { tags as t } from '@lezer/highlight';
import { mode } from 'mode-watcher';

const fontSize = '17px';

export const getThemeExtensions = () => {
	return mode.current == 'light'
		? [lightTheme, syntaxHighlighting(defaultHighlightStyle)]
		: [darkTheme, syntaxHighlighting(darkHighlightStyle)];
};

const darkTheme = EditorView.theme(
	{
		'&': {
			color: '#d4d4d4',
			backgroundColor: 'transparent',
			fontSize: fontSize
		},
		'.cm-content': {
			caretColor: '#ffffff'
		},
		'.cm-cursor, .cm-dropCursor': {
			borderLeftColor: '#ffffff'
		},
		'.cm-activeLine': {
			backgroundColor: 'transparent'
		},
		'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': {
			backgroundColor: '#264f78'
		},
		'.cm-gutters': {
			backgroundColor: 'transparent'
		},
		'.cm-activeLineGutter': {
			backgroundColor: 'transparent'
		}
	},
	{ dark: true }
);

const darkHighlightStyle = HighlightStyle.define([
	{ tag: t.keyword, color: '#ff7b72' },
	{ tag: [t.name, t.deleted, t.character, t.macroName], color: '#d2a8ff' },
	{ tag: [t.propertyName], color: '#79c0ff' },
	{ tag: [t.processingInstruction, t.string, t.inserted, t.special(t.string)], color: '#a5d6ff' },
	{ tag: [t.function(t.variableName), t.labelName], color: '#d2a8ff' },
	{ tag: [t.color, t.constant(t.name), t.standard(t.name)], color: '#79c0ff' },
	{ tag: [t.definition(t.name), t.separator], color: '#c9d1d9' },
	{ tag: [t.className], color: '#ffa657' },
	{ tag: [t.number, t.changed, t.annotation, t.modifier, t.self, t.namespace], color: '#ffa657' },
	{ tag: [t.typeName], color: '#7ee787' },
	{ tag: [t.operator, t.operatorKeyword], color: '#ff7b72' },
	{ tag: [t.url, t.escape, t.regexp, t.link], color: '#a5d6ff' },
	{ tag: [t.meta, t.comment], color: '#8b949e', fontStyle: 'italic' },
	{ tag: t.strong, fontWeight: 'bold' },
	{ tag: t.emphasis, fontStyle: 'italic' },
	{ tag: t.strikethrough, textDecoration: 'line-through' },
	{ tag: t.link, color: '#a5d6ff', textDecoration: 'underline' },
	{ tag: t.heading, fontWeight: 'bold', color: '#1f6feb' },
	{ tag: [t.atom, t.bool, t.special(t.variableName)], color: '#79c0ff' },
	{ tag: t.invalid, color: '#f85149' }
]);

const lightTheme = EditorView.theme(
	{
		'&': {
			fontSize: fontSize
		},
		'.cm-activeLine': {
			backgroundColor: 'transparent'
		},
		'.cm-gutters': {
			backgroundColor: 'transparent'
		},
		'.cm-activeLineGutter': {
			backgroundColor: 'transparent'
		}
	},
	{ dark: false }
);
