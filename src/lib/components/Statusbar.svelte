<script lang="ts">
	import * as Tooltip from '$lib/components/ui/tooltip';
	import { settings, toggleConsole, toggleSidebar } from '$lib/settings.svelte';
	import { cn } from '$lib/utils';
	import { PanelLeft, Terminal } from '@lucide/svelte';
	import { buttonVariants } from './ui/button';

	const kbdClass =
		'bg-background text-foreground border-secondary rounded border px-1 py-0.5 shadow-inner';

	let { sidebarOpen, consoleOpen } = $derived(settings.current);
	let sidebarClasses = $derived(getButtonClass(sidebarOpen));
	let consoleClasses = $derived(getButtonClass(consoleOpen));

	function getButtonClass(isOpen: boolean): string {
		return cn(
			buttonVariants({
				variant: isOpen ? 'secondary' : 'ghost',
				size: 'icon'
			}),
			'hidden xl:flex',
			'size-6'
		);
	}
</script>

<div class="flex w-full gap-2 border-t px-2 py-1">
	<Tooltip.Provider>
		<Tooltip.Root>
			<Tooltip.Trigger onclick={toggleSidebar} class={sidebarClasses}>
				<PanelLeft class="size-3"></PanelLeft>
			</Tooltip.Trigger>
			<Tooltip.Content class="flex items-center">
				<span>Toggle Sidebar</span>
				<div class="ml-3 flex flex-nowrap gap-2">
					<kbd class={kbdClass}>Ctrl</kbd>
					<kbd class={kbdClass}>B</kbd>
				</div>
			</Tooltip.Content>
		</Tooltip.Root>

		<Tooltip.Root>
			<Tooltip.Trigger onclick={toggleConsole} class={consoleClasses}>
				<Terminal class="size-3"></Terminal>
			</Tooltip.Trigger>
			<Tooltip.Content class="flex items-center">
				<span>Toggle Sidebar</span>
				<div class="ml-3 flex flex-nowrap gap-2">
					<kbd class={kbdClass}>Ctrl</kbd>
					<kbd class={kbdClass}>J</kbd>
				</div>
			</Tooltip.Content>
		</Tooltip.Root>
	</Tooltip.Provider>
</div>
