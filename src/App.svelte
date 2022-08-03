<script>
	import { resizing, html, css, js, tailwind } from './lib/stores/store.js';

	import Sidebar from './lib/components/Sidebar.svelte';
	import Navbar from './lib/components/Navbar.svelte';
	import Footer from './lib/components/Footer.svelte';

	let srcDoc;
	let cooldownTimer;

	$: {
		clearTimeout(cooldownTimer);
		cooldownTimer = setTimeout(async () => {
			srcDoc = `
      <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Document</title>
          ${$tailwind ? `<script src='https://cdn.tailwindcss.com'/><\/script>` : ''}
        </head>
        <body>${$html}</body>
        <style>${$css}</style>
        <script>${$js}<\/script>
      </html>`;
		}, 320);
	}
</script>

<main class="w-screen h-screen flex flex-col overflow-hidden min-w-[700px]">
	<Navbar />
	<section class="flex h-full overflow-hidden">
		<Sidebar />
		<div class="flex flex-1 relativ">
			{#if $resizing}
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
		</div>
	</section>
	<Footer />
</main>

<style>
	:global(.CodeMirror) {
		height: 100%;
		font-size: 17px;
	}

	:global(body) {
		margin: 0;
	}
</style>
