<script lang="ts">
	import { html } from '@codemirror/lang-html';
	import { StateEffect, type Extension } from '@codemirror/state';
	import { EditorView, ViewUpdate } from '@codemirror/view';
	import { mode } from 'mode-watcher';
	import { untrack } from 'svelte';
	import { baseExtensions } from './extensions';
	import { darkTheme, lightTheme } from './themes';

	let { docValue = $bindable() }: { docValue: string } = $props();

	const onUpdate = EditorView.updateListener.of((update: ViewUpdate) => {
		if (update.docChanged) {
			console.log('Updated content:', update.state.doc.toString());
			docValue = update.state.doc.toString();
		}
	});

	let parent: HTMLDivElement;
	let theme: Extension;
	let view: EditorView | null;
	let extensions = [...baseExtensions, html(), onUpdate];

	$effect(() => {
		theme = mode.current === 'light' ? lightTheme : darkTheme;
		if (!view) return;
		view.dispatch({
			effects: StateEffect.reconfigure.of([...extensions, theme])
		});
	});

	$effect(() => {
		if (!parent) return;
		untrack(() => {
			view = new EditorView({
				doc: '',
				parent: parent,
				extensions: [...extensions, theme]
			});
		});
	});
</script>

<div bind:this={parent}></div>
