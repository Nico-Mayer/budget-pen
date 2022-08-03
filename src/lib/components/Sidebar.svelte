<script>
	import Editor from './Editor.svelte';
	import { Pane, Splitpanes } from 'svelte-splitpanes';
	import { resizing, html, css, js } from '../stores/store.js';
	import { onMount } from 'svelte';

	let sidebar;

	function handleSidebarResize() {
		$resizing = true;
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);

		function handleMouseMove(e) {
			if (e.clientX > 300) {
				sidebar.style.width = e.clientX + 'px';
				document.body.style.cursor = 'col-resize';
			}
		}
		function handleMouseUp() {
			$resizing = false;
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

<section bind:this={sidebar} class="flex w-[472px] dark:bg-[#3B4252]">
	<Splitpanes horizontal={true} theme="own" firstSplitter={true}>
		<Pane maxSize={100} class="html-pane">
			<Editor lang={'xml'} bind:value={$html} />
		</Pane>

		<Pane maxSize={100}>
			<Editor lang={'javascript'} bind:value={$js} />
		</Pane>

		<Pane maxSize={100}>
			<Editor lang={'css'} bind:value={$css} />
		</Pane>
	</Splitpanes>

	<div
		on:mousedown={handleSidebarResize}
		class="flex h-full w-[14px] cursor-col-resize border-x dark:(border-white/5 bg-[#1c212b]) border-black/20 items-center border-t"
	>
		<div class="i-charm-menu-hamburger rotate-90 dark:text-white/30 text-black/60" />
	</div>
</section>

<style>
	:global(.splitpanes__splitter) {
		height: 44px;
		position: relative;
		@apply border-t;
		@apply border-black/20;
		--at-apply: 'dark:border-white/5';
		--at-apply: 'dark:bg-#1c212b';
		@apply bg-[#F7F7F7];
		cursor: row-resize;
	}
	:global(.splitpanes__splitter:before) {
		position: absolute;
		display: flex;
		align-items: center;
		padding-left: 50px;
		@apply font-mono;
		@apply border-t-3;
		@apply border-white/10;
		color: black;
		left: 0;
		right: 0;
		bottom: 0;
		top: 0;
		z-index: 1;
		--at-apply: 'dark:text-white';
		--at-apply: 'dark:bg-#1f2430';
		background-color: #f7f7f7;
		background-repeat: no-repeat;
		background-position: 15px 50%;
		background-size: 20px;
		width: 110px;
	}
	:global(.html-splitter) {
		cursor: auto;
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
