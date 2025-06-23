<script lang="ts">
	import type { SupportedLanguages } from '$lib/components/Editor/Editor.svelte';
	import Editor from '$lib/components/Editor/Editor.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { cssValue, htmlValue, jsValue } from '$lib/settings.svelte';
	import { formatCode, getViewportPercentage } from '$lib/utils';
	import Icon from '@iconify/svelte';
	import { SquareCode } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { buttonVariants } from './ui/button/button.svelte';

	let minSizeEditorPane: number = $state(5);

	onMount(() => {
		minSizeEditorPane = getViewportPercentage(45, 'height');
	});

	async function handleFormat(lang: SupportedLanguages) {
		const mapping = {
			js: jsValue,
			css: cssValue,
			html: htmlValue
		};

		try {
			const currentValue = mapping[lang].current;
			const formatted = await formatCode(currentValue, lang);
			mapping[lang].current = formatted;
		} catch (error) {
			console.error('Formatting failed:', error);
		}
	}
</script>

<svelte:window onresize={() => (minSizeEditorPane = getViewportPercentage(45, 'height'))} />

{#snippet paneHeader(lang: SupportedLanguages, icon: string)}
	<div class="bg-muted flex w-full items-center justify-between px-4 py-2">
		<div class="flex flex-nowrap items-center gap-4">
			<Icon {icon} height="20" width="20" class="shrink-0"></Icon>
			<span class="font-mono">
				{lang.toUpperCase()}
			</span>
		</div>

		<div class="z-100">
			<Tooltip.Provider>
				<Tooltip.Root>
					<Tooltip.Trigger
						onclick={() => handleFormat(lang)}
						class={buttonVariants({ variant: 'ghost', size: 'icon' }) + ' !size-6 cursor-pointer'}
					>
						<SquareCode></SquareCode>
					</Tooltip.Trigger>
					<Tooltip.Content>
						<p>Format</p>
					</Tooltip.Content>
				</Tooltip.Root>
			</Tooltip.Provider>
		</div>
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
	<Resizable.Handle class="sidebar_resizable_handle" />
	<Resizable.Pane minSize={minSizeEditorPane}>
		<div class="flex h-full w-full flex-col items-center justify-center">
			{@render paneHeader('js', 'skill-icons:javascript')}
			<div class="h-full w-full overflow-auto">
				<Editor language="js" bind:docValue={jsValue.current}></Editor>
			</div>
		</div>
	</Resizable.Pane>
	<Resizable.Handle class="sidebar_resizable_handle" />
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
	:global(.sidebar_resizable_handle::after) {
		height: 40px;
		transform: translate(0px, 20px);
	}
</style>
