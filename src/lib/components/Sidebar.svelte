<script lang="ts">
	import type { SupportedLanguages } from '$lib/components/Editor/Editor.svelte';
	import Editor from '$lib/components/Editor/Editor.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import Icon from '@iconify/svelte';

	let htmlValue = $state('');
	let jsValue = $state('');
	let cssValue = $state('');

	$inspect(htmlValue);
	$inspect(jsValue);
	$inspect(cssValue);
</script>

{#snippet paneHeader(lang: SupportedLanguages, icon: string)}
	<div class="bg-sidebar flex w-full items-center gap-2 p-2">
		<Icon {icon} height="20" width="20" class="shrink-0"></Icon>
		<span class="font-mono">
			{lang.toUpperCase()}
		</span>
	</div>
{/snippet}

<Resizable.PaneGroup direction="vertical">
	<Resizable.Pane minSize={3.3}>
		<div class="flex h-full w-full flex-col items-center justify-center">
			{@render paneHeader('html', 'skill-icons:html')}
			<div class="h-full w-full overflow-auto">
				<Editor language="html" bind:docValue={htmlValue}></Editor>
			</div>
		</div>
	</Resizable.Pane>
	<Resizable.Handle class="sidebar_resizable_handler" />
	<Resizable.Pane minSize={3.3}>
		<div class="flex h-full w-full flex-col items-center justify-center">
			{@render paneHeader('js', 'skill-icons:javascript')}
			<div class="h-full w-full overflow-auto">
				<Editor language="js" bind:docValue={jsValue}></Editor>
			</div>
		</div>
	</Resizable.Pane>
	<Resizable.Handle class="sidebar_resizable_handler" />
	<Resizable.Pane minSize={3.3}>
		<div class="flex h-full w-full flex-col items-center justify-center">
			{@render paneHeader('css', 'skill-icons:css')}
			<div class="h-full w-full overflow-auto">
				<Editor language="css" bind:docValue={cssValue}></Editor>
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
