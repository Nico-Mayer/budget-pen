<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Statusbar from '$lib/components/Statusbar.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import type { PaneAPI } from 'paneforge';

	let jsPane: PaneAPI;
</script>

<div class="flex h-svh flex-col">
	<Navbar></Navbar>

	<main class="flex h-full flex-1">
		<Resizable.PaneGroup direction="horizontal">
			<Resizable.Pane>
				<Resizable.PaneGroup direction="vertical">
					<Resizable.Pane order={1} minSize={4}>HTML</Resizable.Pane>
					<Resizable.Handle withHandle />
					<Resizable.Pane bind:this={jsPane} order={2} minSize={4}>JS</Resizable.Pane>
					<Resizable.Handle withHandle />
					<Resizable.Pane order={3} minSize={4}>CSS</Resizable.Pane>
				</Resizable.PaneGroup>
			</Resizable.Pane>
			<Resizable.Handle />
			<Resizable.Pane>Content</Resizable.Pane>
		</Resizable.PaneGroup>
	</main>
	<Statusbar></Statusbar>
</div>
