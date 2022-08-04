<script>
	import { isDark } from '../stores/darkMode';

	let iconSize = '20';
</script>

<button
	class="w-[48px] h-[29px] border flex items-center rounded-full bg-panelFgLight text-base relative border-uiLineLight bg-none dark:(border-uiLineDark bg-panelFgDark)"
	on:click={() => ($isDark = !$isDark)}
>
	<div
		class="rounded-full h-6 w-6 bg-panelBgLight flex justify-center items-center transition-all duration-700 absolute left-[2px] dark:(bg-panelBgDark left-[20px] text-accentDark) text-accentLight shadow-inner"
	>
		{#if !$isDark}
			{#key $isDark}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					aria-hidden="true"
					role="img"
					class="iconify iconify--line-md"
					width={iconSize}
					height={iconSize}
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
					><g fill="none" stroke="currentColor" stroke-linecap="round" stroke-width="2"
						><path
							stroke-dasharray="34"
							stroke-dashoffset="34"
							d="M12 7C14.76 7 17 9.24 17 12C17 14.76 14.76 17 12 17C9.24 17 7 14.76 7 12C7 9.24 9.24 7 12 7"
							><animate
								fill="freeze"
								attributeName="stroke-dashoffset"
								dur="0.4s"
								values="34;0"
							/></path
						><g stroke-dasharray="2" stroke-dashoffset="2"
							><path d="M0 0"
								><animate
									fill="freeze"
									attributeName="d"
									begin="0.5s"
									dur="0.2s"
									values="M12 19v1M19 12h1M12 5v-1M5 12h-1;M12 21v1M21 12h1M12 3v-1M3 12h-1"
								/><animate
									fill="freeze"
									attributeName="stroke-dashoffset"
									begin="0.5s"
									dur="0.2s"
									values="2;0"
								/></path
							><path d="M0 0"
								><animate
									fill="freeze"
									attributeName="d"
									begin="0.7s"
									dur="0.2s"
									values="M17 17l0.5 0.5M17 7l0.5 -0.5M7 7l-0.5 -0.5M7 17l-0.5 0.5;M18.5 18.5l0.5 0.5M18.5 5.5l0.5 -0.5M5.5 5.5l-0.5 -0.5M5.5 18.5l-0.5 0.5"
								/><animate
									fill="freeze"
									attributeName="stroke-dashoffset"
									begin="0.7s"
									dur="0.2s"
									values="2;0"
								/></path
							></g
						></g
					></svg
				>
			{/key}
		{:else}
			{#key $isDark}
				<svg
					xmlns="http://www.w3.org/2000/svg"
					xmlns:xlink="http://www.w3.org/1999/xlink"
					aria-hidden="true"
					role="img"
					class="iconify iconify--line-md"
					width={iconSize}
					height={iconSize}
					preserveAspectRatio="xMidYMid meet"
					viewBox="0 0 24 24"
					><g fill="currentColor" fill-opacity="0"
						><path
							d="M15.22 6.03L17.75 4.09L14.56 4L13.5 1L12.44 4L9.25 4.09L11.78 6.03L10.87 9.09L13.5 7.28L16.13 9.09L15.22 6.03Z"
							><animate
								fill="freeze"
								attributeName="fill-opacity"
								begin="0.7s"
								dur="0.4s"
								values="0;1"
							/></path
						><path
							d="M19.61 12.25L21.25 11L19.19 10.95L18.5 9L17.81 10.95L15.75 11L17.39 12.25L16.8 14.23L18.5 13.06L20.2 14.23L19.61 12.25Z"
							><animate
								fill="freeze"
								attributeName="fill-opacity"
								begin="1.1s"
								dur="0.4s"
								values="0;1"
							/></path
						></g
					><path
						fill="none"
						stroke="currentColor"
						stroke-dasharray="56"
						stroke-dashoffset="56"
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M7 6 C7 12.08 11.92 17 18 17 C18.53 17 19.05 16.96 19.56 16.89 C17.95 19.36 15.17 21 12 21 C7.03 21 3 16.97 3 12 C3 8.83 4.64 6.05 7.11 4.44 C7.04 4.95 7 5.47 7 6 Z"
						><animate
							fill="freeze"
							attributeName="stroke-dashoffset"
							dur="0.6s"
							values="56;0"
						/></path
					></svg
				>
			{/key}
		{/if}
	</div>
</button>
