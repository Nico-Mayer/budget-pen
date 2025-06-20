<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Statusbar from '$lib/components/Statusbar.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import {
		cssValue,
		htmlValue,
		jsValue,
		settings,
		toggleConsole,
		toggleSidebar
	} from '$lib/settings.svelte';
	import { Debounced } from 'runed';

	let { sidebarOpen, consoleOpen, tailwind } = $derived(settings.current);
	/* eslint-disable */
	let srcDoc = new Debounced(() => {
		return `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          ${tailwind ? '<script src="https://cdn.tailwindcss.com"/><\\/script>' : ''}
        </head>
		<script>
			const originalLog = console.log;
			console.log = (...args) => {
  				parent.window.postMessage({ type: 'log', args: args }, '*')
  				originalLog(...args)
			};
		<\/script>
        <body>${htmlValue.current}</body>
        <style>${cssValue.current}</style>
        <script>${jsValue.current}<\/script>
        </html>`;
	}, 300);

	function handleKeyDown(e: KeyboardEvent) {
		if (e.metaKey && e.key.toLowerCase() === 'b') {
			e.preventDefault();
			toggleSidebar();
		} else if (e.metaKey && e.key.toLowerCase() === 'j') {
			e.preventDefault();
			toggleConsole();
		}
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="fixed flex h-svh w-svw flex-col">
	<Navbar></Navbar>

	<main class="flex h-full flex-1">
		<Resizable.PaneGroup direction="horizontal">
			{#if sidebarOpen}
				<Resizable.Pane defaultSize={30} minSize={20} order={1}>
					<Sidebar></Sidebar>
				</Resizable.Pane>
				<Resizable.Handle withHandle />
			{/if}

			<Resizable.Pane defaultSize={80} order={2}>
				<Resizable.PaneGroup direction="vertical">
					<Resizable.Pane order={1} defaultSize={70}>
						<div class="h-full bg-white">
							<iframe
								srcdoc={srcDoc.current}
								sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"
								title="output"
								frameborder="0"
								width="100%"
								height="100%"
							></iframe>
						</div>
					</Resizable.Pane>
					{#if consoleOpen}
						<Resizable.Handle withHandle />
						<Resizable.Pane order={2} defaultSize={30}>Console</Resizable.Pane>
					{/if}
				</Resizable.PaneGroup>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</main>
	<Statusbar></Statusbar>
</div>
