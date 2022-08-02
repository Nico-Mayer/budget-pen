<script>
	import { tailwind } from '../stores/store';
	import { slide } from 'svelte/transition';
</script>

<div class="h-14 bg-[#1c212b] w-full flex items-center px-3 justify-between text-white">
	<section class="flex font-mono text-2xl items-center space-x-4">
		<div class="i-carbon-trash-can" />
		<h1 class="">BudgetPen</h1>
	</section>
	<selection class="text-2xl flex items-center text-white/50 transition duration-250 space-x-4">
		{#key $tailwind}
			<button
				class="i-simple-icons-tailwindcss hover:text-white/90"
				class:bg-[#44A8B3]={$tailwind}
				on:click={() => ($tailwind = !$tailwind)}
				in:slide
			/>
		{/key}
		<button class="i-carbon-download hover:text-white/90" />
	</selection>
</div>
