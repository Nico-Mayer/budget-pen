import { EditorView } from '@codemirror/view';

export const darkTheme = EditorView.theme(
	{
		'&': {
			color: '#d4d4d4',
			backgroundColor: '#1e1e1e'
		},
		'.cm-content': {
			caretColor: '#ffffff'
		},
		'.cm-cursor, .cm-dropCursor': {
			borderLeftColor: '#ffffff'
		},
		'&.cm-focused .cm-selectionBackground, .cm-selectionBackground, ::selection': {
			backgroundColor: '#264f78'
		}
	},
	{ dark: true }
);

export const lightTheme = EditorView.theme({}, { dark: false });
