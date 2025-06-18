<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Statusbar from '$lib/components/Statusbar.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';

	let showConsole = $state(true);
</script>

<div class="flex h-svh flex-col">
	<Navbar></Navbar>

	<main class="flex h-full flex-1">
		<Resizable.PaneGroup direction="horizontal">
			<Resizable.Pane defaultSize={30} minSize={20}>
				<Sidebar></Sidebar>
			</Resizable.Pane>
			<Resizable.Handle />
			<Resizable.Pane defaultSize={80}>
				<Resizable.PaneGroup direction="vertical">
					<Resizable.Pane order={1} defaultSize={70}>Content</Resizable.Pane>
					{#if showConsole}
						<Resizable.Handle withHandle />
						<Resizable.Pane order={2} defaultSize={30}>Console</Resizable.Pane>
					{/if}
				</Resizable.PaneGroup>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</main>
	<Statusbar></Statusbar>
</div>
