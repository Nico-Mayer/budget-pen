<script>
	import Editor from './lib/components/Editor.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	let html = "<h1 class='text-7xl p-6 animate-bounce'>Hello World</h1>";
	let css = '';
	let js = '';
	let cooldownTimer;
	let sidebar;

	let resizing = false;
	let srcDoc;

	$: {
		clearTimeout(cooldownTimer);
		cooldownTimer = setTimeout(async () => {
			srcDoc = `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          <script src="https://cdn.tailwindcss.com"><\/script>  
        </head>
        <body>${html}</body>
        <style>${css}</style>
        <script>${js}<\/script>
      </html>`;
		}, 320);
	}

	function handleSidebarResize() {
		resizing = true;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		function handleMouseMove(e) {
			if (e.clientX > 300) {
				sidebar.style.width = e.clientX + 'px';
				document.body.style.cursor = 'col-resize';
			}
		}
		function handleMouseUp() {
			resizing = false;
			document.body.style.cursor = 'auto';
			window.removeEventListener('mousemove', handleMouseMove);
			window.removeEventListener('mouseup', handleMouseUp);
		}
	}
</script>

<main class="w-screen h-screen flex">
	<section bind:this={sidebar} class="sidebar flex w-[472px]">
		<Splitpanes horizontal={true} theme="test">
			<Pane minSize={4} maxSize={100}>
				<Editor title={'HTML'} lang={'xml'} bind:value={html} />
			</Pane>

			<Pane minSize={3} maxSize={100}>
				<Editor title={'JS'} lang={'javascript'} bind:value={js} />
			</Pane>

			<Pane minSize={3} maxSize={100}>
				<Editor title={'CSS'} lang={'css'} bind:value={css} />
			</Pane>
		</Splitpanes>

		<div
			on:mousedown={handleSidebarResize}
			class="flex h-full w-[20px] cursor-col-resize border-white/20 border-x bg-[#22272E]"
		/>
	</section>

	<section class="flex flex-1 relativ">
		{#if resizing}
			<div class="bg-transparent w-full h-full absolute left-0 top-0" />
		{/if}
		<iframe
			srcdoc={srcDoc}
			sandbox="allow-forms allow-modals allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-top-navigation-by-user-activation allow-downloads allow-presentation"
			title="output"
			frameborder="0"
			width="100%"
			height="100%"
		/>
	</section>
</main>

<style>
	:global(.splitpanes__splitter) {
		background-color: black;
		position: relative;
		height: 15px;
	}
</style>
