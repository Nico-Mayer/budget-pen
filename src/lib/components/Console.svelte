<script lang="ts" module>
	export type Entry = {
		id: string;
		content: string;
	};
</script>

<script lang="ts">
	let {
		consoleEntries
	}: {
		consoleEntries: Entry[];
	} = $props();
</script>

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
