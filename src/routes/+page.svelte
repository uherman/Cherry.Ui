<script lang="ts">
	import { Button } from '$lib/components/ui/button';
	import Input from '@/components/ui/input/input.svelte';
	import * as Card from '$lib/components/ui/card';
	import { Label } from '@/components/ui/label';
	import { notifications } from '@/stores/userStore';
	import { toast } from 'svelte-sonner';

	let title: string = 'Hello!';
	let message: string = 'This is a test notification';

	const handleClick = async () => {
		try {
			const res = await fetch('/api/UserNotification', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title,
					message
				})
			});

			if (res.ok) {
				const response = await fetch('/api/UserNotification');
				notifications.set(await response.json());
			} else {
				toast.error('Failed to send notification');
			}
		} catch (e) {
			toast.error('An error occurred while sending the notification, please try again.');
		}
	};
</script>

<main class="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
	<div class="flex items-center">
		<h1 class="text-lg font-semibold md:text-2xl">Cherry</h1>
	</div>
	<div
		data-x-chunk-name="dashboard-02-chunk-1"
		data-x-chunk-description="An empty state showing no products with a heading, description and a call to action to add a product."
		class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
	>
		<div class="flex flex-col items-center gap-1 text-center">
			<h3 class="text-2xl font-bold tracking-tight">This page is under development</h3>
			<p class="text-sm text-muted-foreground">
				But you can still send a notification to yourself.
			</p>
			<Card.Root class="mt-8 w-full text-start">
				<Card.Header>
					<Card.Title>Try out the notification feature</Card.Title>
					<Card.Description>Send a notification to yourself.</Card.Description>
				</Card.Header>
				<Card.Content class="text-start">
					<Label class="mt-4" for="title">Title</Label>
					<Input class="mb-2 w-full text-[16px]" id="title" bind:value={title} />
					<Label class="mt-4" for="title">Message</Label>
					<Input class="w-full text-[16px]" bind:value={message} />
					<Button class="mt-4" on:click={handleClick}>Send a notification</Button>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</main>
