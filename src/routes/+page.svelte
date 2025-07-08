<script lang="ts">
	import Console, { type Entry } from '$lib/components/Console.svelte';
	import Editor from '$lib/components/Editor/Editor.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Sidebar from '$lib/components/Sidebar.svelte';
	import Statusbar from '$lib/components/Statusbar.svelte';
	import * as Resizable from '$lib/components/ui/resizable/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import {
		cssValue,
		htmlValue,
		jsValue,
		setConsoleHeight,
		setSidebarWidth,
		settings,
		toggleConsole,
		toggleSidebar
	} from '$lib/settings.svelte';
	import { Debounced } from 'runed';
	import { onMount } from 'svelte';

	let iframe: HTMLIFrameElement;
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

		iframe?.addEventListener('load', () => {
			consoleEntries = [];
		});

		window.addEventListener('message', handler);

		return () => {
			window.removeEventListener('message', handler);
		};
	});

	let { sidebarOpen, consoleOpen, consoleHeight, tailwind, sidebarWidth } = $derived(
		settings.current
	);

	/* eslint-disable */
	let srcDoc = new Debounced(() => {
		return `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          ${tailwind ? `<script src='https://cdn.tailwindcss.com'/><\/script>` : ''}
        </head>
		<script>
			const originalLog = console.log;
			console.log = (...args) => {
  		        parent.window.postMessage({ type: 'log', args: args, }, '*')
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

	function handleSidebarResize(size: number, prevSize: number | undefined) {
		setSidebarWidth(size);
	}
	function handleConsoleResize(size: number, prevSize: number | undefined) {
		setConsoleHeight(size);
	}
</script>

<svelte:window onkeydown={handleKeyDown} />

<div class="fixed flex h-svh w-svw flex-col">
	<Navbar></Navbar>

	<div class="hidden flex-1 xl:flex">
		<Resizable.PaneGroup direction="horizontal">
			{#if sidebarOpen}
				<Resizable.Pane
					defaultSize={sidebarWidth}
					minSize={20}
					order={1}
					onResize={handleSidebarResize}
				>
					<Sidebar></Sidebar>
				</Resizable.Pane>
				<Resizable.Handle withHandle class="test" />
			{/if}

			<Resizable.Pane defaultSize={100 - sidebarWidth} order={2}>
				<Resizable.PaneGroup direction="vertical">
					<Resizable.Pane order={1} defaultSize={100 - consoleHeight}>
						<div class="h-full bg-white">
							<iframe
								bind:this={iframe}
								id="preview"
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
						<Resizable.Pane order={2} defaultSize={consoleHeight} onResize={handleConsoleResize}>
							<Console {consoleEntries}></Console>
						</Resizable.Pane>
					{/if}
				</Resizable.PaneGroup>
			</Resizable.Pane>
		</Resizable.PaneGroup>
	</div>

	<!-- Mobile View -->
	<div class="flex flex-1 xl:hidden">
		<Tabs.Root value="html" class="w-full">
			<div class="flex w-full px-4 py-2">
				<Tabs.List class="w-full">
					<Tabs.Trigger value="html">HTML</Tabs.Trigger>
					<Tabs.Trigger value="js">JS</Tabs.Trigger>
					<Tabs.Trigger value="css">CSS</Tabs.Trigger>
					<Tabs.Trigger value="result">Result</Tabs.Trigger>
				</Tabs.List>
			</div>

			<Tabs.Content value="html">
				<Editor language="html" bind:docValue={htmlValue.current}></Editor>
			</Tabs.Content>
			<Tabs.Content value="js">
				<Editor language="js" bind:docValue={jsValue.current}></Editor>
			</Tabs.Content>
			<Tabs.Content value="css">
				<Editor language="css" bind:docValue={cssValue.current}></Editor>
			</Tabs.Content>
			<Tabs.Content value="result">
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
			</Tabs.Content>
		</Tabs.Root>
	</div>

	<Statusbar></Statusbar>
</div>
