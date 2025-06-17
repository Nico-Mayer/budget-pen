<script lang="ts">
	import Editor from '$lib/components/Editor/Editor.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Statusbar from '$lib/components/Statusbar.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import Icon from '@iconify/svelte';
	import type { PaneAPI } from 'paneforge';

	let jsPane: PaneAPI;
	let showConsole = $state(true);
</script>

{#snippet paneHeader(title: string, icon: string)}
	<div class="bg-sidebar flex w-full items-center gap-2 p-2">
		<Icon {icon} height="20" width="20"></Icon>
		<span>
			{title}
		</span>
	</div>
{/snippet}

<div class="flex h-svh flex-col">
	<Navbar></Navbar>

	<main class="flex h-full flex-1">
		<Resizable.PaneGroup direction="horizontal">
			<Resizable.Pane defaultSize={30}>
				<Resizable.PaneGroup direction="vertical">
					<Resizable.Pane minSize={3.5}>
						<div class="flex h-full w-full flex-col items-center justify-center">
							{@render paneHeader('HTML', 'skill-icons:html')}
							<div class="h-full w-full overflow-auto">
								<Editor></Editor>
							</div>
						</div>
						<!-- <div class="overflow-scroll">
							{@render paneHeader('HTML', 'skill-icons:html')}
							<Editor></Editor>
						</div> -->
					</Resizable.Pane>
					<Resizable.Handle withHandle />
					<Resizable.Pane minSize={3.5} bind:this={jsPane}>
						{@render paneHeader('JS', 'skill-icons:javascript')}
					</Resizable.Pane>
					<Resizable.Handle withHandle />
					<Resizable.Pane minSize={3.5}>
						{@render paneHeader('CSS', 'skill-icons:css')}
					</Resizable.Pane>
				</Resizable.PaneGroup>
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
