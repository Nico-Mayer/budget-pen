<script lang="ts">
	import { browser } from '$app/environment';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	let isDark = $state(false);

	onMount(() => {
		if (!browser) return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		isDark = mediaQuery.matches;

		const handleChange = (e: MediaQueryListEvent) => {
			isDark = e.matches;
		};

		mediaQuery.addEventListener('change', handleChange);

		return () => {
			mediaQuery.removeEventListener('change', handleChange);
		};
	});
</script>

<svelte:head>
	<link rel="icon" href={isDark ? 'favicon_dark.png' : 'favicon_light.png'} />
</svelte:head>

<ModeWatcher></ModeWatcher>
{@render children()}
