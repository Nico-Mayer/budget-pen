<script>
	import { tailwind } from '../stores/store';
	import { blur } from 'svelte/transition';
	import tippy from 'svelte-tippy';
	import 'tippy.js/animations/perspective-subtle.css';
	import DarkModeToggle from './DarkModeToggle.svelte';

	$: tippyTailwindContent = $tailwind ? 'Tailwind Off' : 'Tailwind On';
</script>

<div
	class="h-16 dark:(bg-[#1c212b]) bg-[#F7F7F7] w-full flex items-center px-3 justify-between font-mono border-black/20"
>
	<section class="flex items-center space-x-4 select-none">
		<div
			class="i-line-md-buy-me-a-coffee-twotone
		text-3xl dark:text-[#ffcc66] text-[#695380]"
		/>
		<h1 class="font-heading text-xl dark:text-[#cccac2] text-black">BudgetPen</h1>
	</section>

	<selection class="text-2xl h-full flex items-center dark:text-[#cccac2] text-black/70 space-x-4">
		<section class="flex space-x-8 pr-4 items-center">
			{#key $tailwind}
				<button
					class="i-simple-icons-tailwindcss dark:(hover:text-white) hover:text-black transition duration-250"
					class:bg-[#44A8B3]={$tailwind}
					on:click={() => ($tailwind = !$tailwind)}
					in:blur={{ duration: 300 }}
					use:tippy={{
						content: tippyTailwindContent,
						placement: 'bottom',
						theme: 'tippy-navbar',
						animation: 'perspective-subtle'
					}}
				/>
			{/key}

			<button
				class="i-carbon-download dark:(hover:text-white) hover:text-black transition duration-250"
				use:tippy={{
					content: 'Download',
					placement: 'bottom',
					theme: 'tippy-navbar',
					animation: 'perspective-subtle'
				}}
			/>
			<button
				class="i-carbon-save dark:(hover:text-white) hover:text-black transition duration-250"
				use:tippy={{
					content: 'Save',
					placement: 'bottom',
					theme: 'tippy-navbar',
					animation: 'perspective-subtle'
				}}
			/>
			<DarkModeToggle />
		</section>

		<section>
			<button
				class="transitio duration-250 border border-[#695380]/50 hover:border-[#695380]/80 dark:(border-[#ffcc66]/20 hover:text-white hover:border-[#ffcc66]/40)  text-base px-4 py-2 rounded-lg"
				>Sign Up</button
			>
			<button
				class="transitio duration-250 text-white bg-[#695380]/50 text-base px-4 py-2 rounded-lg
				hover:(bg-[#695380]/80) 
				dark:(bg-[#ffcc66]/40 text-black hover:bg-[#ffcc66]/70 hover:text-white) 
				">Log In</button
			>
		</section>
	</selection>
</div>

<style>
	:global(.tippy-box[data-theme='tippy-navbar']) {
		@apply inline-block py-1 px-2.5 text-sm font-medium rounded-lg shadow-sm;
		@apply bg-[#171b24];
		@apply text-[#cccac2] font-mono;
	}
</style>
