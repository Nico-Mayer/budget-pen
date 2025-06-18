import { EditorView } from '@codemirror/view';
import { mode } from 'mode-watcher';

const fontSize = '17px';

export const getTheme = () => {
	return mode.current == 'light' ? lightTheme : darkTheme;
};

const darkTheme = EditorView.theme(
	{
		'&': {
			color: '#d4d4d4',
			backgroundColor: '#1e1e1e',
			fontSize: fontSize
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

const lightTheme = EditorView.theme(
	{
		'&': {
			fontSize: fontSize
		}
	},
	{ dark: false }
);
