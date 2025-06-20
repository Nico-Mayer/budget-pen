<script lang="ts">
	import { StateEffect } from '@codemirror/state';
	import { EditorView, ViewUpdate } from '@codemirror/view';
	import { onMount } from 'svelte';
	import { baseExtensions } from './extensions';
	import { getThemeExtensions } from './themes';
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

	let view: EditorView | null = null;
	let themeExtensions = getThemeExtensions();
	let extensions = [...baseExtensions(language), onUpdate];

	onMount(() => {
		if (!parent) return;

		view = new EditorView({
			doc: docValue,
			parent: parent,
			extensions: [...extensions, ...themeExtensions]
		});
		return () => {
			view?.destroy();
		};
	});

	$effect(() => {
		if (!view) return;
		themeExtensions = getThemeExtensions();

		view.dispatch({
			effects: StateEffect.reconfigure.of([...extensions, ...themeExtensions])
		});
	});
</script>

<div bind:this={parent}></div>
