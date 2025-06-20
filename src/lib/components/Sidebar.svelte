<script lang="ts">
	import type { SupportedLanguages } from '$lib/components/Editor/Editor.svelte';
	import Editor from '$lib/components/Editor/Editor.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import { cssValue, htmlValue, jsValue } from '$lib/settings.svelte';
	import { getViewportPercentage } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { onMount } from 'svelte';

	let minSizeEditorPane: number = $state(5);

	onMount(() => {
		minSizeEditorPane = getViewportPercentage(45, 'height');
	});
</script>

<svelte:window onresize={() => (minSizeEditorPane = getViewportPercentage(45, 'height'))} />

{#snippet paneHeader(lang: SupportedLanguages, icon: string)}
	<div class="bg-sidebar flex w-full items-center gap-4 px-4 py-2">
		<Icon {icon} height="20" width="20" class="shrink-0"></Icon>
		<span class="font-mono">
			{lang.toUpperCase()}
		</span>
	</div>
{/snippet}

<Resizable.PaneGroup direction="vertical">
	<Resizable.Pane minSize={minSizeEditorPane}>
		<div class="flex h-full w-full flex-col items-center justify-center">
			{@render paneHeader('html', 'skill-icons:html')}
			<div class="h-full w-full overflow-auto">
				<Editor language="html" bind:docValue={htmlValue.current}></Editor>
			</div>
		</div>
	</Resizable.Pane>
	<Resizable.Handle class="sidebar_resizable_handler" />
	<Resizable.Pane minSize={minSizeEditorPane}>
		<div class="flex h-full w-full flex-col items-center justify-center">
			{@render paneHeader('js', 'skill-icons:javascript')}
			<div class="h-full w-full overflow-auto">
				<Editor language="js" bind:docValue={jsValue.current}></Editor>
			</div>
		</div>
	</Resizable.Pane>
	<Resizable.Handle class="sidebar_resizable_handler" />
	<Resizable.Pane minSize={minSizeEditorPane}>
		<div class="flex h-full w-full flex-col items-center justify-center">
			{@render paneHeader('css', 'skill-icons:css')}
			<div class="h-full w-full overflow-auto">
				<Editor language="css" bind:docValue={cssValue.current}></Editor>
			</div>
		</div>
	</Resizable.Pane>
</Resizable.PaneGroup>

<style>
	:global(.sidebar_resizable_handler::after) {
		height: 40px;
		transform: translate(0px, 20px);
	}
</style>
