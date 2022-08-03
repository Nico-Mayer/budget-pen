<script>
	import { tailwind } from '../stores/store';
	import { slide } from 'svelte/transition';
</script>

<div class="h-16 bg-[#1c212b] w-full flex items-center px-3 justify-between font-mono">
	<section class="flex items-center space-x-4">
		<div
			class="i-line-md-buy-me-a-coffee-twotone
		text-3xl text-[#ffcc66]"
		/>
		<h1 class="font-heading text-xl text-[#cccac2]">BudgetPen</h1>
	</section>
	<selection class="text-2xl flex items-center text-[#cccac2] space-x-4">
		<section class="flex space-x-8 pr-4">
			{#key $tailwind}
				<button
					class="i-simple-icons-tailwindcss hover:text-white transition duration-250 "
					class:bg-[#44A8B3]={$tailwind}
					on:click={() => ($tailwind = !$tailwind)}
					in:slide
				/>
			{/key}

			<button class="i-carbon-download hover:text-white transition duration-250 " />
			<button class="i-carbon-save hover:text-white transition duration-250 " />
		</section>

		<section>
			<button
				class="transitio duration-250 border border-[#ffcc66]/20 hover:(text-white border-[#ffcc66]/40)  text-base px-4 py-2 rounded-lg"
				>Sign Up</button
			>
			<button
				class="transitio duration-250 bg-[#ffcc66]/20 text-black hover:(bg-[#ffcc66]/70 text-white) text-base px-4 py-2 rounded-lg"
				>Log In</button
			>
		</section>
	</selection>
</div>
