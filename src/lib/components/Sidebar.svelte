<script lang="ts">
	import type { SupportedLanguages } from '$lib/components/Editor/Editor.svelte';
	import Editor from '$lib/components/Editor/Editor.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import Icon from '@iconify/svelte';
	import type { PaneAPI } from 'paneforge';

	let jsPane: PaneAPI;
</script>

{#snippet pane(lang: SupportedLanguages, icon: string)}
	<div class="flex h-full w-full flex-col items-center justify-center">
		<div class="bg-sidebar flex w-full items-center gap-2 p-2">
			<Icon {icon} height="20" width="20" class="shrink-0"></Icon>
			<span class="font-mono">
				{lang.toUpperCase()}
			</span>
		</div>
		<div class="h-full w-full overflow-auto">
			<Editor language={lang}></Editor>
		</div>
	</div>
{/snippet}

<Resizable.PaneGroup direction="vertical">
	<Resizable.Pane minSize={3.3}>
		{@render pane('html', 'skill-icons:html')}
	</Resizable.Pane>
	<Resizable.Handle class="sidebar_resizable_handler" />
	<Resizable.Pane minSize={3.3} bind:this={jsPane}>
		{@render pane('js', 'skill-icons:javascript')}
	</Resizable.Pane>
	<Resizable.Handle class="sidebar_resizable_handler" />
	<Resizable.Pane minSize={3.3}>
		{@render pane('css', 'skill-icons:css')}
	</Resizable.Pane>
</Resizable.PaneGroup>

<style>
	:global(.sidebar_resizable_handler::after) {
		height: 40px;
		transform: translate(0px, 20px);
	}
</style>
