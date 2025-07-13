<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { setConsoleHeight, settings, toggleConsole } from '$lib/settings.svelte';
	import { getViewportPercentage } from '$lib/utils';
	import { BrushCleaning, SquareTerminal, X } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import { buttonVariants } from './ui/button/button.svelte';

	type Entry = {
		id: string;
		content: string;
	};

	let { consoleOpen, consoleHeight } = $derived(settings.current);
	let consoleEntries: Entry[] = $state([]);
	let minSizeConsolePane = $state(5);

	onMount(() => {
		minSizeConsolePane = getViewportPercentage(45, 'height');
		const handler = (e: MessageEvent) => {
			if (e.data.type === 'log') {
				const entry = {
					id: crypto.randomUUID(),
					content: e.data.args.join(' ')
				};
				consoleEntries.push(entry);
			}
		};
		const iframe = document.getElementById('preview') as HTMLIFrameElement;

		iframe?.addEventListener('load', () => {
			consoleEntries = [];
		});

		window.addEventListener('message', handler);

		// This forces a reload so the first logs on load are added
		// iframe.src = iframe.src;

		return () => {
			window.removeEventListener('message', handler);
		};
	});

	function handleConsoleResize(size: number) {
		setConsoleHeight(size);
	}
</script>

<svelte:window onresize={() => (minSizeConsolePane = getViewportPercentage(45, 'height'))} />

{#if consoleOpen}
	<Resizable.Handle class="console_resizable_handle" />
	<Resizable.Pane
		order={2}
		defaultSize={consoleHeight}
		onResize={handleConsoleResize}
		minSize={minSizeConsolePane}
	>
		<div class="flex h-full flex-col overflow-hidden">
			<div class="bg-muted flex w-full justify-between px-4 py-2">
				<div class="flex items-center gap-2">
					<SquareTerminal class="size-4"></SquareTerminal>
					Console
				</div>

				<div class="z-10 flex items-center gap-2">
					<Tooltip.Provider>
						<Tooltip.Root>
							<Tooltip.Trigger
								onclick={() => (consoleEntries = [])}
								class={buttonVariants({ variant: 'ghost', size: 'icon' }) +
									' !size-6 cursor-pointer'}
							>
								<BrushCleaning></BrushCleaning>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<p>Clear console</p>
							</Tooltip.Content>
						</Tooltip.Root>

						<Tooltip.Root>
							<Tooltip.Trigger
								onclick={toggleConsole}
								class={buttonVariants({ variant: 'ghost', size: 'icon' }) +
									' !size-6 cursor-pointer'}
							>
								<X></X>
							</Tooltip.Trigger>
							<Tooltip.Content>
								<p>Close</p>
							</Tooltip.Content>
						</Tooltip.Root>
					</Tooltip.Provider>
				</div>
			</div>

			<ul class="flex h-full flex-col gap-0.5 overflow-auto p-2 font-mono">
				{#each consoleEntries as entry (entry.id)}
					<li>
						{entry.content}
					</li>
				{/each}
			</ul>
		</div>
	</Resizable.Pane>
{/if}

<style>
	:global(.console_resizable_handle::after) {
		height: 40px;
		transform: translate(0px, 20px);
	}
</style>
