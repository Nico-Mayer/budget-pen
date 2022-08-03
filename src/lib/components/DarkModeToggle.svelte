<script>
	let darkMode = true;
</script>

<main class="w-16 h-8 dark:bg-black bg-white flex items-center rounded-full text-base relative">
	<button
		class="bg-black dark:bg-[#cccac2] rounded-full h-6 w-6 flex justify-center items-center transition-all duration-700 absolute left-[4px] dark:left-[36px]"
		on:click={() => document.documentElement.classList.toggle('dark')}
	>
		<div class="i-carbon-sun dark:i-carbon-moon text-black" />
	</button>
</main>
