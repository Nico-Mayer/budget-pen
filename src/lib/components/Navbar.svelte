<script lang="ts">
	import { buttonVariants } from '$lib/components/ui/button';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { settings, toggleTailwind } from '$lib/settings.svelte';
	import { Download, SquareArrowOutUpRight } from '@lucide/svelte';
	import ThemeSwitcher from './ThemeSwitcher.svelte';
	let { tailwind } = $derived(settings.current);

	function openInNewTab() {
		const preview = document.querySelector('#preview') as HTMLIFrameElement;
		if (!preview) return;
		const blob = new Blob([preview.srcdoc], { type: 'text/html' });
		const url = URL.createObjectURL(blob);
		const newWindow = window.open(url, '_blank');

		if (newWindow) {
			newWindow.focus();
			setTimeout(() => URL.revokeObjectURL(url), 1000);
		}
	}
</script>

<nav class="flex w-full items-center justify-between border-b px-4 py-3">
	<h1
		class="flex flex-nowrap items-center gap-2 text-lg font-bold tracking-tighter text-balance transition-all duration-300 md:text-2xl"
	>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			xmlns:xlink="http://www.w3.org/1999/xlink"
			aria-hidden="true"
			role="img"
			class="iconify iconify--line-md text-accentLight dark:text-accentDark size-7 md:size-9"
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
		Budget Pen
	</h1>

	<div class="flex items-center gap-2">
		<Tooltip.Provider>
			<Tooltip.Root>
				<Tooltip.Trigger
					class={buttonVariants({ variant: 'outline', size: 'icon' })}
					onclick={toggleTailwind}
				>
					{#if tailwind}
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 128 128"
							><!-- Icon from Devicon by konpa - https://github.com/devicons/devicon/blob/master/LICENSE --><path
								fill="#38bdf8"
								d="M64.004 25.602c-17.067 0-27.73 8.53-32 25.597c6.398-8.531 13.867-11.73 22.398-9.597c4.871 1.214 8.352 4.746 12.207 8.66C72.883 56.629 80.145 64 96.004 64c17.066 0 27.73-8.531 32-25.602q-9.6 12.803-22.399 9.602c-4.87-1.215-8.347-4.746-12.207-8.66c-6.27-6.367-13.53-13.738-29.394-13.738M32.004 64c-17.066 0-27.73 8.531-32 25.602Q9.603 76.799 22.402 80c4.871 1.215 8.352 4.746 12.207 8.66c6.274 6.367 13.536 13.738 29.395 13.738c17.066 0 27.73-8.53 32-25.597q-9.6 12.797-22.399 9.597c-4.87-1.214-8.347-4.746-12.207-8.66C55.128 71.371 47.868 64 32.004 64m0 0"
							/></svg
						>
					{:else}
						<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 512 512"
							><!-- Icon from File Icons by John Gardner - https://github.com/file-icons/icons/blob/master/LICENSE.md --><path
								fill="currentColor"
								d="M128 204.667C145.062 136.227 187.738 102 256 102c102.4 0 115.2 77 166.4 89.833c34.138 8.56 64-4.273 89.6-38.5C494.938 221.773 452.262 256 384 256c-102.4 0-115.2-77-166.4-89.833c-34.138-8.56-64 4.273-89.6 38.5m-128 154C17.062 290.227 59.738 256 128 256c102.4 0 115.2 77 166.4 89.833c34.138 8.56 64-4.273 89.6-38.5C366.938 375.773 324.262 410 256 410c-102.4 0-115.2-77-166.4-89.833c-34.138-8.56-64 4.273-89.6 38.5"
							/></svg
						>
					{/if}
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>
						Tailwind
						{#if tailwind}
							off
						{:else}
							on
						{/if}
					</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger class={buttonVariants({ variant: 'outline', size: 'icon' })}>
					<Download></Download>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Download</p>
				</Tooltip.Content>
			</Tooltip.Root>

			<Tooltip.Root>
				<Tooltip.Trigger
					class={buttonVariants({ variant: 'outline', size: 'icon' })}
					onclick={openInNewTab}
				>
					<SquareArrowOutUpRight></SquareArrowOutUpRight>
				</Tooltip.Trigger>
				<Tooltip.Content>
					<p>Open in new Tab</p>
				</Tooltip.Content>
			</Tooltip.Root>
		</Tooltip.Provider>

		<div class="ml-3">
			<ThemeSwitcher></ThemeSwitcher>
		</div>
	</div>
</nav>
