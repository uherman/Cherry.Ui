<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import { notifications } from '@/stores/userStore';
	import { toast } from 'svelte-sonner';

	const handleClick = async () => {
		try {
			const res = await fetch('/api/UserNotification', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					title: `Hello ${Math.random()}`,
					message: 'This is a test notification'
				})
			});

			if (res.ok) {
				toast.success('Notification sent');
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
		<h1 class="text-lg font-semibold md:text-2xl">Inventory</h1>
	</div>
	<div
		data-x-chunk-name="dashboard-02-chunk-1"
		data-x-chunk-description="An empty state showing no products with a heading, description and a call to action to add a product."
		class="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm"
	>
		<div class="flex flex-col items-center gap-1 text-center">
			<h3 class="text-2xl font-bold tracking-tight">You have no products</h3>
			<p class="text-sm text-muted-foreground">
				You can start selling as soon as you add a product.
			</p>
			<Button class="mt-4" on:click={handleClick}>Add Product</Button>
		</div>
	</div>
</main>
