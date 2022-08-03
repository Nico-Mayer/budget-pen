<script>
	import { isDark } from '../stores/darkMode';
	import { slide } from 'svelte/transition';
</script>

<button
	class="w-[48px] h-[29px] border flex items-center rounded-full text-base relative border-uiLineLight bg-panelFgLight dark:(border-uiLineDark bg-panelFgDark)"
	on:click={() => ($isDark = !$isDark)}
>
	<div
		class="rounded-full h-6 w-6 bg-accentLight flex justify-center items-center transition-all duration-700 absolute left-[2px] dark:(bg-accentDark left-[20px] text-black) hover:rotate-28"
	>
		{#key $isDark}
			<div class="i-carbon-sun dark:i-carbon-moon" in:slide />
		{/key}
	</div>
</button>
