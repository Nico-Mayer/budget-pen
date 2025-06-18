<script lang="ts">
	import { StateEffect, type Extension } from '@codemirror/state';
	import { EditorView, ViewUpdate } from '@codemirror/view';
	import { baseExtensions } from './extensions';
	import { getTheme } from './themes';
	export type SupportedLanguages = 'html' | 'js' | 'css';

	let { docValue = $bindable(''), language }: { docValue?: string; language: SupportedLanguages } =
		$props();

	const onUpdate = EditorView.updateListener.of((update: ViewUpdate) => {
		if (update.docChanged) {
			console.log('Updated content:', update.state.doc.toString());
			docValue = update.state.doc.toString();
		}
	});

	let parent: HTMLDivElement;
	let theme: Extension;
	let view: EditorView | null;
	let extensions = [...baseExtensions(language), onUpdate];

	$effect(() => {
		theme = getTheme();
		if (!view) return;
		view.dispatch({
			effects: StateEffect.reconfigure.of([...extensions, theme])
		});
	});

	$effect(() => {
		if (!parent) return;
		view = new EditorView({
			doc: '',
			parent: parent,
			extensions: [...extensions, theme]
		});
	});
</script>

<div bind:this={parent}></div>
