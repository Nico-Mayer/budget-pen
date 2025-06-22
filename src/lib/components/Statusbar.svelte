<script lang="ts">
	import { settings, toggleConsole, toggleSidebar } from '$lib/settings.svelte';
	import { PanelLeft, Terminal } from '@lucide/svelte';
	import Button from './ui/button/button.svelte';

	let { sidebarOpen, consoleOpen } = $derived(settings.current);
</script>

<div class="flex w-full gap-2 border-t px-2 py-1">
	<Button
		variant={sidebarOpen ? 'secondary' : 'ghost'}
		size="icon"
		class="hidden size-6 xl:flex"
		onclick={toggleSidebar}
	>
		<PanelLeft class="size-3"></PanelLeft>
	</Button>
	<Button
		variant={consoleOpen ? 'secondary' : 'ghost'}
		size="icon"
		class="size-6"
		onclick={toggleConsole}
	>
		<Terminal class="size-3"></Terminal>
	</Button>
</div>
