<script lang="ts">
	import { X } from 'lucide-svelte';
	import Check from 'lucide-svelte/icons/check';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { notifications, type Notification } from '@/stores/userStore';
	import { toast } from 'svelte-sonner';

	let clearIndex = NaN;

	const animateClear = (notification: Notification, idx: number) => {
		clearIndex = idx;
		const timeout = setTimeout(() => {
			notifications.update((n) => n.filter((n) => n.id !== notification.id));
			clearIndex = NaN;
			clearTimeout(timeout);
		}, 300);
	};

	const deleteNotification = async (notification: Notification): Promise<Response> => {
		return await fetch(`/api/UserNotification/${notification.id}`, {
			method: 'DELETE'
		});
	};

	const clearNotification = async (notification: Notification, idx: number) => {
		const res = await deleteNotification(notification);
		if (res.ok) {
			animateClear(notification, idx);
		} else {
			toast.error('An error occurred while clearing the notification, please try again.');
		}
	};

	const clearAllNotifications = async () => {
		await Promise.all(
			$notifications.map(async (notification) => {
				const res = await deleteNotification(notification);
				if (res.ok) {
					notifications.update((n) => n.filter((n) => n.id !== notification.id));
				} else {
					toast.error('An error occurred while clearing the notifications, please try again.');
				}
			})
		);
	};

	$: hasNotifications = $notifications.length > 0;
	$: description = hasNotifications
		? `You have ${$notifications.length} unread messages.`
		: 'No new notifications';
</script>

<Card.Root class="w-full">
	<Card.Header class={hasNotifications ? 'border-b' : ''}>
		<Card.Title>Notifications</Card.Title>
		<Card.Description>{description}</Card.Description>
	</Card.Header>
	<Card.Content class="flex justify-center px-2 py-0">
		<div
			class={`no-scrollbar max-h-96 w-full overflow-y-scroll md:w-72 ${hasNotifications && 'pt-2'}`}
		>
			{#each $notifications as notification, idx (idx)}
				<div
					class={`mb-2 flex w-full ${clearIndex === idx && 'translate-x-[-500px] transition-transform'} items-center justify-between border-b p-2 pb-4 last-of-type:border-none`}
				>
					<div class="flex items-start gap-4">
						<span class="mt-1 flex h-2 min-h-2 w-2 min-w-2 rounded-full bg-sky-500" />
						<div class="space-y-1">
							<p class="text-sm font-medium leading-none">
								{notification.title}
							</p>
							<p class="text-sm text-muted-foreground">
								{notification.message}
							</p>
						</div>
					</div>
					<Button
						on:click={() => clearNotification(notification, idx)}
						variant="link"
						size="icon"
						class="h-6 w-6"
					>
						<X class="h-4 w-4 text-muted-foreground" />
					</Button>
				</div>
			{/each}
		</div>
	</Card.Content>
	{#if hasNotifications}
		<Card.Footer class="border-t pt-4">
			<Button class="w-full" on:click={clearAllNotifications}>
				<Check class="mr-2 h-4 w-4" /> Mark all as read
			</Button>
		</Card.Footer>
	{/if}
</Card.Root>
