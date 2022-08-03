<script>
	let darkMode = false;
</script>

<main
	class="w-18 h-8 bg-[#1F2430] flex items-center rounded-full p-2 dark:justify-end justify-start text-base"
>
	<button
		class="bg-[#cccac2] rounded-full h-6 w-6 flex justify-center items-center"
		on:click={() => document.documentElement.classList.toggle('dark')}
	>
		<div class="i-carbon-sun dark:i-carbon-moon text-black" />
	</button>
</main>
