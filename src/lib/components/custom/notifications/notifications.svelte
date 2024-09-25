<script lang="ts">
	import { Bell, BellRing } from 'lucide-svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Popover from '$lib/components/ui/popover';
	import NotificationCard from './notification-card.svelte';
	import { notifications } from '@/stores/userStore';

	$: icon = $notifications.length > 0 ? BellRing : Bell;
</script>

<Popover.Root>
	<Popover.Trigger class="ml-auto">
		<Button variant="outline" size="icon" class="relative h-8 w-8">
			{#if $notifications.length > 0}
				<span class="absolute left-[-2.5px] top-[-2.5px] flex h-2 w-2 rounded-full bg-red-500" />
			{/if}
			<svelte:component this={icon} class="h-4 w-4" />
			<span class="sr-only">Toggle notifications</span>
		</Button>
	</Popover.Trigger>
	<Popover.Content
		sideOffset={5}
		class="w-screen rounded-lg border-none p-0 shadow-none md:w-auto"
		fitViewport
	>
		<NotificationCard />
	</Popover.Content>
</Popover.Root>
