<script lang="ts">
	import { page } from '$app/stores';
	import { Button } from '@/components/ui/button';
</script>

<article class="flex items-center justify-center" style="margin-top:100px;">
	<div class="flex flex-col items-center gap-1 text-center">
		<h3 class="text-2xl font-bold tracking-tight">{$page.status}: {$page.error?.message}</h3>
		<p class="text-sm text-muted-foreground">The page you are looking for does not exist.</p>
		<Button href="/" class="mt-4">Go back</Button>
	</div>
</article>
