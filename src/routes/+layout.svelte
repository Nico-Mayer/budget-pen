<script lang="ts">
	import { dev } from '$app/environment';
	import { injectAnalytics } from '@vercel/analytics/sveltekit';

	import { browser } from '$app/environment';
	import { ModeWatcher } from 'mode-watcher';
	import { onMount } from 'svelte';
	import '../app.css';

	injectAnalytics({ mode: dev ? 'development' : 'production' });

	let { children } = $props();

	let isDark = $state(false);
	let loading = $state(true);

	onMount(() => {
		if (!browser) return;

		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		isDark = mediaQuery.matches;

		const handleChange = (e: MediaQueryListEvent) => {
			isDark = e.matches;
		};

		mediaQuery.addEventListener('change', handleChange);

		setTimeout(() => {
			loading = false;
		}, 1350);

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
{#if loading}
	<div class="bg-background absolute flex h-svh w-svw items-center justify-center">
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			aria-hidden="true"
			role="img"
			class="iconify iconify--line-md text-accentLight dark:text-accentDark size-36"
			preserveAspectRatio="xMidYMid meet"
			viewBox="0 0 24 24"
			><mask id="IconifyId18265db10ea134879295"
				><path
					fill="#fff"
					d="M5 6C5 4 7 6 11.5 6C16 6 19 4 19 6L19 7C19 8.5 17 9 12.5 9C8 9 5 9 5 7L5 6Z"
				></path></mask
			><mask id="IconifyId18265db10ea134879296"
				><path
					fill="#fff"
					d="M10.125 18.15C10.04 17.29 9.4 11.98 9.4 11.98C9.4 11.98 11.34 12.31 12.5 11.73C13.66 11.16 14.98 11 14.98 11C14.98 11 14.4 17.96 14.35 18.46C14.3 18.96 13.45 19.3 12.95 19.3L11.23 19.3C10.73 19.3 10.21 19 10.125 18.15Z"
				></path></mask
			><g
				fill="none"
				stroke="currentColor"
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				><path
					stroke-dasharray="32"
					stroke-dashoffset="32"
					d="M7.5 10.5C7.5 10.5 8.33 17.43 8.5 19C8.67 20.57 10 21 11 21L13 21C14.5 21 15.875 19.86 16 19C16.125 18.14 17 7 17 7"
					><animate fill="freeze" attributeName="stroke-dashoffset" dur="0.4s" values="32;0"
					></animate></path
				><path
					stroke-dasharray="12"
					stroke-dashoffset="12"
					d="M16.5 6C16.5 3.5 14 3 12 3C10 3 9.1 3.43 8 4"
					><animate
						fill="freeze"
						attributeName="stroke-dashoffset"
						begin="0.8s"
						dur="0.2s"
						values="12;24"
					></animate></path
				></g
			><rect
				width="16"
				height="5"
				x="20"
				y="4"
				fill="currentColor"
				mask="url(#IconifyId18265db10ea134879295)"
				><animate fill="freeze" attributeName="x" begin="0.4s" dur="0.4s" values="20;4"
				></animate></rect
			><rect
				width="8"
				height="10"
				x="8"
				y="20"
				fill="currentColor"
				fill-opacity=".3"
				mask="url(#IconifyId18265db10ea134879296)"
				><animate fill="freeze" attributeName="y" begin="1s" dur="0.4s" values="20;10"
				></animate></rect
			></svg
		>
	</div>
{/if}
