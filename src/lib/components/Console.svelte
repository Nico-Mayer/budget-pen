<script lang="ts">
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import { setConsoleHeight, settings } from '$lib/settings.svelte';
	import { onMount } from 'svelte';

	type Entry = {
		id: string;
		content: string;
	};

	let { consoleOpen, consoleHeight } = $derived(settings.current);
	let consoleEntries: Entry[] = $state([]);

	onMount(() => {
		const handler = (e: MessageEvent) => {
			if (e.data.type === 'log') {
				const entry = {
					id: crypto.randomUUID(),
					content: e.data.args.join(' ')
				};
				consoleEntries.push(entry);
			}
		};
		const iframe = document.getElementById('preview');

		iframe?.addEventListener('load', () => {
			consoleEntries = [];
		});

		window.addEventListener('message', handler);

		return () => {
			window.removeEventListener('message', handler);
		};
	});

	function handleConsoleResize(size: number) {
		setConsoleHeight(size);
	}
</script>

{#if consoleOpen}
	<Resizable.Handle withHandle />
	<Resizable.Pane order={2} defaultSize={consoleHeight} onResize={handleConsoleResize}>
		<div class="flex h-full flex-col overflow-hidden">
			<div class="flex w-full justify-between">
				<div class="bg-muted px-4 py-2">Console</div>
				<button>Close</button>
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
