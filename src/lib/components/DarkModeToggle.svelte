<script>
	import { isDark } from '../stores/darkMode';
	import { slide } from 'svelte/transition';
</script>

<button
	class="w-16 h-8 dark:(bg-[#63759925] border-none) border-black/50 border flex items-center rounded-full text-base relative"
	on:click={() => ($isDark = !$isDark)}
>
	<div
		class="bg-[#ffcc66]/50 dark:bg-[#695380] rounded-full h-7 w-7 flex justify-center items-center transition-all duration-700 absolute left-[3px] dark:left-[32px] hover:rotate-28"
	>
		{#key $isDark}
			<div class="i-carbon-sun dark:i-carbon-moon text-black/50 dark:text-[#cccac2]" in:slide />
		{/key}
	</div>
</button>
