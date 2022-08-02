<script>
	import Editor from './lib/components/Editor.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { onMount } from 'svelte';
	let html = '';
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

	onMount(() => {
		let splitters = document.querySelectorAll('.splitpanes__splitter');

		for (let i = 0; i < splitters.length; i++) {
			switch (i) {
				case 0:
					splitters[i].classList.add('html-splitter');
					break;
				case 1:
					splitters[i].classList.add('js-splitter');
					break;
				case 2:
					splitters[i].classList.add('css-splitter');
					break;
			}
		}
	});
</script>

<main class="w-screen h-screen flex flex-col overflow-hidden">
	<div class="h-14 bg-[#22272e] w-full" />

	<div class="flex h-full overflow-hidden">
		<section bind:this={sidebar} class="sidebar flex w-[472px]">
			<Splitpanes horizontal={true} theme="own" firstSplitter={true}>
				<Pane maxSize={100} class="html-pane">
					<Editor lang={'xml'} bind:value={html} />
				</Pane>

				<Pane maxSize={100}>
					<Editor lang={'javascript'} bind:value={js} />
				</Pane>

				<Pane maxSize={100}>
					<Editor lang={'css'} bind:value={css} />
				</Pane>
			</Splitpanes>

			<div
				on:mousedown={handleSidebarResize}
				class="flex h-full w-[20px] cursor-col-resize border-white/10 border-x border-t bg-[#22272E]"
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
	</div>
	<div class="bg-[#22272e] border-t border-white/10 h-7 w-full" />
</main>

<style>
	:global(.splitpanes__splitter) {
		height: 44px;
		position: relative;
		@apply border-t;
		@apply border-white/10;
		background-color: #22272e;
	}
	:global(.splitpanes__splitter:before) {
		position: absolute;
		display: flex;
		align-items: center;
		padding-left: 50px;
		@apply font-mono;
		@apply border-t-4;
		@apply border-white/20;
		color: white;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		opacity: 1;
		z-index: 1;
		background-color: #2e3440;
		background-repeat: no-repeat;
		background-position: 15px 50%;
		background-size: 20px;
		width: 110px;
	}
	:global(.html-splitter.splitpanes__splitter:before) {
		content: 'HTML';
		background-image: url('https://api.iconify.design/icomoon-free:html-five.svg?color=%23FF694B');
	}
	:global(.js-splitter.splitpanes__splitter:before) {
		content: 'JS';
		background-image: url('https://api.iconify.design/cib:javascript.svg?color=%23F7DD1E');
	}
	:global(.css-splitter.splitpanes__splitter:before) {
		content: 'CSS';
		background-image: url('https://api.iconify.design/icomoon-free:css3.svg?color=%2330ace0');
	}
</style>
