<script lang="ts">
	import Console from '$lib/components/Console.svelte';
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
		setSidebarWidth,
		settings,
		toggleConsole,
		toggleSidebar
	} from '$lib/settings.svelte';
	import { Debounced } from 'runed';

	let { sidebarOpen, consoleHeight, tailwind, sidebarWidth } = $derived(settings.current);

	/* eslint-disable */
	let srcDoc = new Debounced(() => {
		return `
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
        ${tailwind ? `<script src="https://cdn.tailwindcss.com"><\/script>` : ''}
      </head>
      <body>${htmlValue.current}</body>
      <style>${cssValue.current}</style>

      <script>
        (function() {
          const originalLog = console.log;

          function serialize(arg) {
            if (arg instanceof Element) {
              let desc = '[DOM Element: <' + arg.tagName.toLowerCase();
              if (arg.id) desc += ' id="' + arg.id + '"';
              if (arg.className) desc += ' class="' + arg.className + '"';
              desc += '>]';
              return desc;
            }
            if (typeof arg === 'function') return '[Function]';
            if (arg instanceof Error) return arg.stack || arg.message;

            if (arg === null || typeof arg !== 'object') return arg;

            try {
              return JSON.parse(JSON.stringify(arg));
            } catch {
              return String(arg);
            }
          }

          console.log = (...args) => {
            try {
              const safeArgs = args.map(serialize);
              parent.postMessage({ type: 'log', args: safeArgs }, '*');
            } catch (e) {
              originalLog('Log proxy error:', e);
            }
            originalLog(...args);
          };
        })();
      <\/script>

      <script>
        ${jsValue.current}
      <\/script>
    </html>
  `;
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
								id="preview"
								loading="lazy"
								srcdoc={srcDoc.current}
								sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"
								title="output"
								frameborder="0"
								width="100%"
								height="100%"
							></iframe>
						</div>
					</Resizable.Pane>
					<Console></Console>
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
